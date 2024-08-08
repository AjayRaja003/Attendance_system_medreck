//schema - collection structure

import mongoose from "mongoose";

const empSchema = mongoose.Schema({
    username:String,
    email:String,
    designation:String,
    password:String,
    status:String
    
})
const Employee= mongoose.model('Employee', empSchema )
export default Employee;
