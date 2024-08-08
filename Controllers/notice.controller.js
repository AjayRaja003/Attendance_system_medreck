import Notice from '../Models/notice.schema.js';
import jwt from 'jsonwebtoken';

// Create a notice
export const createNotice = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const adminId = decoded.userId;

        const notice = new Notice({
            ...req.body,
            admin: adminId
        });

        const result = await notice.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all notices
export const getNotices = async (req, res) => {
    try {
        const notices = await Notice.find();
        res.status(200).json(notices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update a notice
export const updateNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        const updatedNotice = await Notice.findByIdAndUpdate(noticeId, req.body, { new: true });
        res.status(200).json(updatedNotice);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
    try {
        const noticeId = req.params.id;
        await Notice.findByIdAndDelete(noticeId);
        res.status(200).json({ message: 'Notice deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
