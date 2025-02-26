import pool from '../db.js';

export const getFreeTeachers = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT u.user_id, u.user_name 
            FROM user u
            WHERE u.role = 'teacher' 
            AND u.user_id NOT IN (
                SELECT teacher_id FROM timetable
                WHERE day_of_week = DAYOFWEEK(NOW()) - 1
            )
        `);
        res.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Database error' });
    }
};
