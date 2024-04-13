import mongoose from "mongoose";
const productSchema = new Schema({
    prouctName :{
        type : String,
        trim : true,
        required: true,
    },
    productDiscription : {
        type : String,
        trim : true,
        required:  true
    },
    productImage : {
        type : String,
        required: true,
    },
    productPrice : {
        type :  String,
        trim : true,
        required: true,
    },
    productSold : {
        type : Number,
        default: 0
    },
    category : {
        type : mongoose.Schema.type.ObjectId,
        ref  : "ProductCategory"
    },
    owner : {
        type : mongoose.Schema.type.ObjectId,
        ref  : "User"
    }
})

export const Product = mongoose.model("Product", productSchema)