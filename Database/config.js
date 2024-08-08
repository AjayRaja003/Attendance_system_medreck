import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDB= async()=>{
   
    try {
       
        const connection= await mongoose.connect(process.env.MONGODBCONNECTIONSTRING)
        console.log("Connected to the MongoDB");
        return connection;
    } catch (error) {
        console.log("Error",error);
    }

}

export default connectDB;