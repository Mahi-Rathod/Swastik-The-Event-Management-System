import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError  } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
import { ApiResponse } from "../utils/ApiResponse";


const addProduct = asyncHandler(async(req, res) =>{
    const {productName, productDescription, productPrice, category} = req.body
    
    if(
        [productName, productDescription, productPrice, category].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400, "All Fields are required");
    }

    const userToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

    const decodeToken = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

    const product = await product.create({
        productName,
        productDescription,
        productPrice,
        category,
        owner : user,
    })

    const addedProduct = await Product.findById(product._id)

    if(!addedProduct){
        throw new ApiError(500, "something went wrong while adding the products..")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(200, addedProduct, "Product added Successfully..")
        )
})

const getProducts = asyncHandler(async(req, res) => {
    try {
        const products = await Product.find({})
        return res
            .status(201)
            .json(
                new ApiResponse(
                    200,
                    {
                        products
                    }
                )
            )
    } catch (error) {
        console.log("somethig went wrong at retrival of products")
    }
})

export {
    addProduct,
    getProducts
}