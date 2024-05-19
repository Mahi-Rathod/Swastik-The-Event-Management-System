import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//Generate Access and refresh Token

const generateAccessAndRefreshToken = async(userId) =>{
    try{
        console.log("step1");
        const user = await User.findById(userId)
        console.log("step2");
        const accessToken = user.generateAccessToken()
        console.log("step3");
        const refreshToken = user.generateRefreshToken()
        console.log("step4");
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

    const {fullName, email, mobileNumber, password, isVendor} =req.body

    if(
        [fullName, email, mobileNumber, password, isVendor].some((field)=> field?.trim()==="")
    ){
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { mobileNumber }]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or phone exist");
    }

    Boolean(isVendor);
    const user = await User.create({
        fullName,
        email,
        mobileNumber,
        isVendor,
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
    console.log(req.body)
    const {email, mobileNumber, password} = req.body

    if(!(mobileNumber || email)){
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

const logoutUser = asyncHandler(async(req, res)=>{
    console.log("logout")
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options ={
        httpOnly:true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200, 
                {},
                "User Logged Out"
            )
        )
})

const getUser = asyncHandler(async(req, res) => {
    res
        .status(200)
        .json(
            new ApiResponse(
            200,
            {
                user: req.user,
            })
        )
})

const changeCurrentPassword = asyncHandler(async(req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(
            400,
            "Invalid old password . . ."
        )
    }

    user.password = newPassword;
    
    await user.save({validateBeforeSave : false});

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password Changed Successfully"
            )
        )
})

const updateAccountDetails = asyncHandler(async(req, res) =>{
    const { fullName, email, mobileNumber } = req.body

    if(!fullName || !email || !mobileNumber){
        throw new ApiError(
            400,
            "All Fields are Required . .. ..."
        )
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set :{
                fullName,
                email,
                mobileNumber
            }
        },
        {
            new : true
        }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                user,
                "Account Details Updated Successfully . . ."
            )
        )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    changeCurrentPassword,
    updateAccountDetails
}