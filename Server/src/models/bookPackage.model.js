import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    orderPrice: {
        type: Number,
        required: true,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    bookedItem: {
        type : Schema.Types.ObjectId,
        ref  : "Product"
    },
    functionDate :{
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        enum: ["PENDING", "CANCELLED", "COMPLETED"],
        default: "PENDING"
    },
},
    { timestamps: true }
)

export const BookPackage = mongoose.model('BookPackage', bookSchema)