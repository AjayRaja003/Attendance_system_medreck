import express from 'express'
import { loginUser, registerUser } from '../Controllers/admin.controller.js';

const route=express.Router()
route.post('/register-admin',registerUser)//http://localhost:5000/admin/register-admin
route.post('/login-admin',loginUser)//http://localhost:5000/admin/login-admin
export default route;