import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js";
const registerUser = asyncHandler (async(req, res)=>{
    // res.status(200).json({
    //     message : "ok"
    // })

    const {fullName, email, mobileNumber, password} =req.body
    console.log("fullName: ", fullName)

    if(
        [fullName, email, mobileNumber, password].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required");
    }
    User.findOne({email})
    
})

export {registerUser}