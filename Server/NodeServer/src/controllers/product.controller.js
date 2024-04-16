import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
    const { productName, productDescription, productPrice, category } = req.body;

    if (
        [ productName, productDescription, productPrice ].some((field)=> field?.trim()==="")
    ) {
        throw new ApiError(400, "All Fields are required");
    }

    const user = req.user

    const productImageLocalPath = req.files?.productImage[0]?.path
    
    if(!productImageLocalPath){
        throw new ApiError(400, "Product Image is Required. .. ...");
    }

    const productImage = await uploadOnCloudinary(productImageLocalPath);
    
    console.log(productImage)
    if(!productImage){
        throw new ApiError(
            400,
            "Avatar file is required"
        )
    }


    const product = await Product.create({
        productName,
        productDescription,
        productPrice,
        category,
        productImage : productImage.url,
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