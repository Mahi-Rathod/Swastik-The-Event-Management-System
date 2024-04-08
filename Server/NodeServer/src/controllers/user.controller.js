import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler (async(req, res)=>{

    const {fullName, email, mobileNumber, password} =req.body
    console.log("fullName: ", fullName)

    if(
        [fullName, email, mobileNumber, password].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = User.findOne({
        $or: [{ email }, { mobileNumber }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or phone exist");
    }
    
    //for avatar

    // const avatarLocalPath = req.files?.avatar[0]?.path
    // const coverImageLocalPath = req.files?.coverImage[0]?.path

    // if(!avatarLocalPath){
    //     throw new ApiError(400, "Avatar File is Required");
    // }

    // const avatar = await uploadOnCloudinary(avatarLocalPath)
    // const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    // if(!avatar){
    //     throw new ApiError(400, "Avatar File is Required");
    // }

    const user = User.create({
        fullName,
        // avatar : avatar.url,
        // coverImage: coverImage?.url || "" ,
        email,
        mobileNumber,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
    if(!createdUser){
        throw new ApiError(500, "Sommething Went Wrong while registring the User..")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Register Successfully!")
    )

})

export {registerUser}