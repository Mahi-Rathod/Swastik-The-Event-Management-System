import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ProductCategory } from "../models/productCategory.model.js";

const addCategories = asyncHandler(async(req, res) => {
    const { categoryName, description } = req.body

    if(![categoryName].every(field => field && field.trim() !== "")){
        throw new ApiError(
            400,
            "All fields are Required."
        )
    }

    const category = await ProductCategory.create({
        categoryName,
        description
    })

    if(!category){
        throw new ApiError(
            500,
            "Something went Wrong .."
        )
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201, 
                category,
                "Category Added SuccessFully...."
            )
        )
})

const getCategories = asyncHandler(async(req, res) => {

    try {
        const categories = await ProductCategory.find({});
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { categories },
                )
            );
    } catch (error) {
        throw new ApiError(
            500,
            "Something Went Wrong While Retrieving Categories.."
        )
    }
})

const getCategoriesById = asyncHandler(async(req, res) => {
    try {
        console.log(req.params.id)
        const category = await ProductCategory.findById(req.params.id)
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    { category }
                )
            )
    } catch (error) {
        throw new ApiError(
            500,
            "Something Went Wrong"
        )
    }
})

export {
    addCategories,
    getCategories,
    getCategoriesById
}