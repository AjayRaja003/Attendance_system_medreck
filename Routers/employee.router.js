import express from 'express'
import { createEmployee, deleteEmployeeById, getEmployeeDetail, getEmployeeDetailById, loginEmployee, updateEmployeeById } from '../Controllers/employee.controller.js';
import authenticateToken from '../middleware/authenticateToken.js';


const router= express.Router()

router.post('/create-emp', createEmployee);  //http://localhost:5000/api/create-emp
router.post('/login-emp', loginEmployee); //http://localhost:5000/api/employee/login-emp
router.get('/get-empdetails', authenticateToken, getEmployeeDetail); //http://localhost:5000/api/employee/get-empdetails
router.get('/getempdetails/:id', authenticateToken, getEmployeeDetailById); //http://localhost:5000/api/employee/getempdetails/:id
router.put('/edit-emp/:id', authenticateToken, updateEmployeeById); //http://localhost:5000/api/employee/edit-emp/:id
router.delete('/deleteemployees/:id', authenticateToken, deleteEmployeeById); //http://localhost:5000/api/employee/deleteemployees/:id

export default router;//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk0Yjg2ZTY3YjVmMjc3MDVkNWRjZTUiLCJyb2xlIjoiZW1wbG95ZWUiLCJpYXQiOjE3MjMwMzE1ODcsImV4cCI6MTcyMzAzNTE4N30.FK3F1rwA-wkbCW-EQ1VAfM15ZP_RKHtPVstWpoTf1Qg