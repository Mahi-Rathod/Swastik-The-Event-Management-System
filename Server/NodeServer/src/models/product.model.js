import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    productName: {
        type: String,
        trim: true,
        required: true,
    },
    productDescription: {
        type: String,
        trim: true,
        required: true
    },
    productImage: {
        type: String,
    },
    productPrice: {
        type: String,
        trim: true,
        required: true,
    },
    productSold: {
        type: Number,
        default: 0
    },
    foodType: {
        type: String,
        required: true,
    },
    decorationType:{
        type : String,
        required : true,
    },
    otherEvents:{
        type : String,
        required : true,
    },
    totalGuests:{
        type : Number,
        requred : true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategory"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Product = mongoose.model("Product", productSchema);
