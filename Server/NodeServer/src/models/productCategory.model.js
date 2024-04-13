import mongoose from "mongoose";

const productCategorySchema = new Schema({
    categoryName : {
        type : String,
        trim : trim,
        required: true,
    },
    description :{
        type : String,
        trim : true,
    }
}, { timestamps : true})

export const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);