import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './Database/config.js'
import empRouter from './Routers/employee.router.js'
import adminroute from './Routers/admin.router.js'
import leaveRouter from './Routers/leave.router.js';
import noticeRouter from './Routers/notice.router.js';
dotenv.config()
const app= express()
app.use(cors())
app.use(express.json())
const port= process.env.PORT

connectDB();

app.use('/api', empRouter);
app.use('/admin',adminroute);
app.use('/leave', leaveRouter);
app.use('/notice', noticeRouter);

app.listen(port,()=>{
    console.log("App is running on the port -", port);
})