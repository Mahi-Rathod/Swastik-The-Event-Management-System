import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";

const addProduct = asyncHandler(async (req, res) => {
    const { productName, productDescription, productPrice, category } = req.body;

    if (![productName, productDescription, productPrice, category].every(field => field && field.trim() !== "")) {
        throw new ApiError(400, "All Fields are required");
    }

    const userToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    let decodeToken;
    try {
        decodeToken = jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, "Invalid token");
    }

    const user = await User.findById(decodeToken?._id).select("-password -refreshToken");

    const product = await Product.create({
        productName,
        productDescription,
        productPrice,
        category,
        owner: user,
    });

    if (!product) {
        throw new ApiError(500, "Something went wrong while adding the product.");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, product, "Product added successfully."));
});

const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        return res
            .status(200)
            .json(new ApiResponse(200, { products }));
    } catch (error) {
        console.log("Something went wrong while retrieving products:", error);
        throw new ApiError(500, "Something went wrong while retrieving products.");
    }
});

export { addProduct, getProducts };