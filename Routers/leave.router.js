import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import { createLeave, getEmployeeLeaves, getAllLeaves, updateLeaveStatus } from '../Controllers/leave.controller.js';

const router = express.Router();

// Employee routes
router.post('/apply', authenticateToken, createLeave); // Employees apply for leave//http://localhost:5000/leave/apply
router.get('/my-leaves', authenticateToken, getEmployeeLeaves); // Employees get their leave applications//http://localhost:5000/leave/my-leaves

// Admin routes
router.get('/all-leaves', authenticateToken, getAllLeaves); // Admin gets all leaves//http://localhost:5000/leave/all-leaves
router.put('/update-status/:id', authenticateToken, updateLeaveStatus); // Admin updates leave status//http://localhost:5000/leave/update-status/:id

export default router;
