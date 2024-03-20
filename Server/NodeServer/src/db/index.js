import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async () => {
    try{
        const database = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log(database);
        const connectionInstance = await mongoose.connect(database)
    }
    catch(error){
        console.log("MongoDB Connection Failed !!!! ",error);
        process.exit(1);
    }
}

export default connectDB;