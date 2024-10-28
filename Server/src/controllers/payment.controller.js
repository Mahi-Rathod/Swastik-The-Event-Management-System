import Razorpay  from 'razorpay';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const {RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY} = process.env;

const razorpayInstance = new Razorpay({
    key_id : RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const createOrder = asyncHandler(async(req, res)=>{
    try {
        const {productName, productDescription, amount, name, contact, email} = req.body;
        const options ={
            amount : parseInt(amount),
            currency: 'INR',
            receipt : 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options,
            (err, order)=>{
                if(!err){
                    return res
                        .status(200)
                        .json(new ApiResponse(
                            200,
                            {
                                order_id:order.id,
                                amount : parseInt(amount),
                                key_id : RAZORPAY_ID_KEY,
                                product_name:productName,
                                description:productDescription,
                                contact:contact,
                                name : name,
                                email : email,
                            },
                            "Order Created"
                        ));
                }
                else{
                    console.log(err)
                    res.status(400).send({success:false,msg:'Something went wrong!'});
                }
            }
        )
    } catch (error) {
        throw new ApiError(500, "Something went wrong.");
    }
});

export {
    createOrder
}