
import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String
})
const Admin= mongoose.model('Admin', adminSchema )
export default Admin;
