import Admin from "../Models/Admin.schema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new Admin({ username, email, password: hashPassword });
        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        
        if (existingAdminByEmail) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            let result = await newUser.save();
            result.password = undefined;
            res.status(200).json({ message: "Register Successful", data: result });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Register Failed, Internal server error' });
    }
};


export const loginUser= async(req, res)=>{

    try {
         const {email, password} = req.body
         const user= await Admin.findOne({email})
         if(!user){
            return res.status(401).json({message:"User Not Found"})
         }
         const passwordMatch = await bcrypt.compare(password, user.password)
         if(!passwordMatch){
            return res.status(401).json({message:"Invalid password"})
         }
         const token = jwt.sign(
            { userId: user._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({message:"Login Successful",token})


    } catch (error) {
        console.log(error);   
        res.status(500).json({error:'login Failed , Internal server error'})
    }
}
