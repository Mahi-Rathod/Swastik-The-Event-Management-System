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

    const customer = req.user

    const bookedItem = await findById(id);
    
    if(!bookedItem){
        throw new ApiError(
            501,
            "Something went wrong..."
        )
    }

    const book = await BookPackage.create({
        customer,
        bookedItem,
        orderPrice,
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

export {
    bookPackage
};