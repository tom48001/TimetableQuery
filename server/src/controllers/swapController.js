export const requestSwap = async (req, res) => {
    const { requestor_id, requested_teacher_id, timetable_id } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO swap_request (requestor_id, requested_teacher_id, timetable_id) 
             VALUES (?, ?, ?)`, 
            [requestor_id, requested_teacher_id, timetable_id]
        );
        res.json({ message: 'Swap request submitted', swap_id: result.insertId });
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).json({ error: 'Database error' });
    }
};
