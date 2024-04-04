import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt, {hash} from 'bcrypt';

const userSchema = new Schema({
    email :{
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
    },
    fullname :{
        type: String,
        trim: true,
        index: true,
        required: true,
    },
    mobileNumber :{
        type: String,
        trim: true,
        index: true,
    },
    avtar:{
        type: String,  //Cloudnary URL
        required:true,
    },
    password :{
        type: String,
        required: [true, "Password is Required"],
    },
    refreshToken :{
        type : String,
    }
}, {timestamps:true});

//Saving Password in hash form
userSchema.pre('save', async function(next){
    if(! this.isModified("password")){
        return next();
    }
    this.password = bcrypt.hash(this.password, 10);
    next();
})

//Checking for correct password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

//generating Access Token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id  : this._id,
            email : this.email,
            username : this.username,
            fullname : this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

//Generating Refresh Token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id  : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}