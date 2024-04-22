import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
    categoryName : {
        type : String,
        trim : true,
        required: true,
    },
    description :{
        type : String,
        trim : true,
    }
}, { timestamps : true})

export const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);