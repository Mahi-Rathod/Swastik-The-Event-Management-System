import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ProductCategory } from "../models/productCategory.model.js"

const addProduct = asyncHandler(async (req, res) => {
    const { productName, productDescription, productPrice, category, foodType, decorationType, otherEvents, totalGuests, country, state, city, banquetHall  } = req.body;

    if (
        [ productName, productDescription, productPrice, foodType, decorationType, otherEvents, totalGuests, country, state, city, banquetHall ].some((field)=> field?.trim()==="")
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

    const categoryObj = await ProductCategory.findById(category);
    if(!categoryObj){
        throw new ApiError(
            501,
            "Something went wrong..."
        )
    }


    const product = await Product.create({
        productDescription,
        decorationType,
        productPrice,
        banquetHall,
        productName,
        otherEvents,
        totalGuests,
        foodType,
        country,
        state,
        city,
        category : categoryObj,
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
        throw new ApiError(500, "Something went wrong while retrieving products.");
    }
});

const getProductById = asyncHandler(async(req, res)=>{
    try{
        const { id } = req.params
        const product = await Product.findById(id);
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {product}
                )
            )
    }
    catch(error){
        throw new ApiError(500, "Something went wrong while retrieving products.");
    }
})

const getProductByCategory = asyncHandler(async(req,res) => {
    try {
        const { id } = req.params;
        const categoryObj = await ProductCategory.findById(id);
        const products = await Product.find({category:categoryObj});

        return res
            .status(200)
            .json(new ApiResponse(200, { products }));

    } catch (error) {
        // console.log(error)
        throw new ApiError(
            501,
            "Something Went Wrong....."
        )
    }
})

export {
    addProduct,
    getProducts,
    getProductById,
    getProductByCategory
};