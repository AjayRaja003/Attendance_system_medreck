import Employee from "../Models/employee.schema.js";
import jwt from 'jsonwebtoken';

export const createEmployee = async (req, res) => {
    try {
        const { username, email, password, designation, status } = req.body;

        const newemployee = new Employee({ username, email, designation, password, status });
        const existingemployeeByEmail = await Employee.findOne({ email: req.body.email });

        if (existingemployeeByEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        let result = await newemployee.save();
        result.password = undefined;

        return res.status(200).json({ message: "Register Successful", data: result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Register Failed, Internal server error' });
    }
};


export const loginEmployee = async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let employee = await Employee.findOne({ email: req.body.email });
            if (employee) {
                if (req.body.password === employee.password) {
                    employee.password = undefined;
                    const token = jwt.sign(
                        { userId: employee._id, role: 'employee' },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    res.status(200).json({ message: "Login Successful", token });
                } else {
                    return res.status(400).json({ message: "Invalid password" });
                }
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        } else {
            return res.status(400).json({ message: "Email and password are required" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Login Failed, Internal server error' });
    }
};


export const getEmployeeDetail = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ message: "Data fetched successfully", data: employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getEmployeeDetailById = async (req, res) => {
    try {
        const empId = req.params.id;
        const employee = await Employee.findById(empId);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ data: employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const updateEmployeeById = async(req, res)=>{
    try {
        const empId = req.params.id;
        const{ username, email, designation, password, status} = req.body

        const result = await Employee.updateOne({_id:empId},{ username, email, designation, password, status})
        if(result.matchedCount === 0){
            return res.status(400).json({message:"emp not found"})
        }
        const updateEmp = await Employee.findById(empId)
        res.status(200).json({data:updateEmp})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}
export const deleteEmployeeById = async (req, res) => {
    try {
        const empId = req.params.id;

        const result = await Employee.deleteOne({ _id: empId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
