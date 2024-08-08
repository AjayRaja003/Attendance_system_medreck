import express from 'express';
import authenticateToken from '../middleware/authenticateToken.js';
import { createNotice, getNotices, updateNotice, deleteNotice } from '../Controllers/notice.controller.js';

const router = express.Router();

// Admin routes
router.post('/create', authenticateToken, createNotice); // Admin creates a notice//http://localhost:5000/notice/create
router.get('/all', authenticateToken, getNotices); // All users get notices//http://localhost:5000/notice/all
router.put('/update/:id', authenticateToken, updateNotice); // Admin updates a notice//http://localhost:5000/notice/update/:id
router.delete('/delete/:id', authenticateToken, deleteNotice); // Admin deletes a notice//http://localhost:5000/notice/delete/:id
//router.delete('/delete-all', authenticateToken, deleteAllNotices); // Admin deletes all notices//http://localhost:5000/notice/delete-all

export default router;
