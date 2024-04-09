import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Generate Access and refresh Token

const generateAccessAndRefreshToken = async(userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500, "Something went wrong while Generating access or refresh token")
    }
}


//Controller for Registering the Users
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

    const user = await User.create({
        fullName,
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

//Controller for Login User
const loginUser = asyncHandler(async(req, res)=>{
    
    const {email, mobileNumber, password} = req.body

    if(!(email || mobileNumber)){
        throw new ApiError(400, "Email or Mobile Number Required")
    }

    const user = await User.findOne({
        $or:[{email}, {mobileNumber}]
    })

    if(!user){
        throw new ApiError(404, "User Does not Exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Password is invalid")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user?._id)
    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure  : true 
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user:loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User Logged In Successfully"
            )
        )
    
})

export {
    registerUser,

}