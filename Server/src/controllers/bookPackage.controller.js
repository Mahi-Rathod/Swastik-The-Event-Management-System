import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { BookPackage } from "../models/bookPackage.model.js";

const bookPackage = asyncHandler(async(req, res)=>{
    const { orderPrice, address, functionDate } = req.body
    const { id } = req.params
    if (
        [ orderPrice, address ].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400, "All Fields are required");
    }
    
    const customer = req.user;

    if(!customer){
        throw new ApiError(
            501,
            "User Not Found"
        )
    }

    const bookedItem = await Product.findById(id);
    
    if(!bookedItem){
        throw new ApiError(
            501,
            "Something went wrong..."
        )
    }

    const book = await BookPackage.create({
        customer,
        bookedItem,
        orderPrice:orderPrice,
        address,
        functionDate
    })
    if(!book){
        throw new ApiError(
            500,
            "Something Went Wrong While Booking"
        )
    }

    return res
        .status(201)
        .json(
            new ApiResponse (
                201,
                book,
                "Your Order Placed SuccessFully..."
            )
        )
});


const getCustomerBookings = asyncHandler(async(req, res)=>{
    try {
        const customer = req.user;
        const bookings = await BookPackage.find({customer : customer});
        if(!bookings){
            throw new ApiError(
                500,
                "Something Happend While Fetching Data"
            )
        }

        const product = await Product.find({'_id':bookings.bookedItem});
    
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    bookings,
                    "Data fetched Successfully"
                )
            )

    } catch (error) {
        console.log(error)
        throw new ApiError(
            501,
            "Something Went Wrong"
        );
    }
});

const getVendorBookings = asyncHandler(async(req, res)=>{
    try {
        const vendor = req.user;

        const bookingsOfVendor = await BookPackage.aggregate([
            {
                $lookup:{
                    from:"products",
                    localField:"bookedItem",
                    foreignField:"_id",
                    as:"bookings",
                },
            },
            {
                $unwind:"$bookings"
            },
            {
                $match:{
                    "bookings.owner":vendor._id
                }
            }
        ]);

        if(!bookingsOfVendor){
            throw new ApiError(
                401,
                "Something Went Wrong"
            )
        }


        return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    bookingsOfVendor,
                    "Fetched Successfully"
                )
            )

    } catch (error) {
        console.log(error);
        throw new ApiError(
            501,
            "Something Went Wrong.....!"
        )
    }
});

const updateStatus = asyncHandler(async(req, res) =>{
    const {id} = req.params;

    const { bookingStatus } = req.body;

    const booking = await BookPackage.findByIdAndUpdate(
        id,
        {
            $set :{
                status : "COMPLETED",
            }
        },
        {
            new : true
        }
    )

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                booking,
                "Status update successfully"
            )
        )
})

export {
    bookPackage,
    getCustomerBookings,
    getVendorBookings,
    updateStatus
};