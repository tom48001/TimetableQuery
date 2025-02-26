import express from 'express';
import pool from '../db.js';
import ensureAuthenticated from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const teacher_id = req.user.user_id;
        const [timetable] = await pool.query(
            "SELECT * FROM timetable WHERE teacher_id = ?",
            [teacher_id]
        );
        res.json(timetable);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
