export const getAllTeachers = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT user_id, user_name FROM user WHERE role = 'teacher'`);
        res.json(rows);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: 'Database error' });
    }
};
