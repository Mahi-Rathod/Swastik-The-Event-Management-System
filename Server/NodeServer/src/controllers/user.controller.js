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

    const existedUser = await User.findOne({
        $or: [{ email }, { mobileNumber }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or phone exist");
    }
    
    //for avatar
    //something
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

    const user = await User.create({
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

const loginUser = asyncHandler (async(req, res) => {

    const {email, mobileNumber, password} = req.body

    if(!email || !mobileNumber){
        throw new ApiError(400, "email or mobileNumber are required")
    }

    const existUser = await User.findOne({
        $or: [{email}, {mobileNumber}]
    })

    if(!existUser){
        throw new ApiError(401, "User with given credentials is Not Found ")
    }
    const checkPassword = await isPasswordCorrect(password);

    if(!checkPassword){
        throw new ApiError(401, "Invalid Password")
    }


})
export {registerUser}