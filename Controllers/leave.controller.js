import Leave from '../models/leave.schema.js';
import jwt from 'jsonwebtoken';

// Create a leave application
export const createLeave = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employeeId = decoded.userId;

        const leave = new Leave({
            employee: employeeId,
            ...req.body,
            status: "Pending"
        });

        const result = await leave.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all leave applications of an employee
export const getEmployeeLeaves = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const employeeId = decoded.userId;

        const leaves = await Leave.find({ employee: employeeId });
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all leave applications for admin
export const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update leave status by admin
export const updateLeaveStatus = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const { status } = req.body;

        const updatedLeave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
        res.status(200).json(updatedLeave);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
