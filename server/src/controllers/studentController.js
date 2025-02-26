//API 來從 MySQL 取得學生資料

import pool from '../db.js';

export const getStudents = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM student');
    res.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Database error' });
  }
};

export const nominateStudent = async (req, res) => {
  try {
    const { student_id } = req.body;
    console.log(`學生 ${student_id} 已被提名`);
    res.json({ message: "提名成功!" });
  } catch (error) {
    console.error('提名錯誤:', error);
    res.status(500).json({ error: "提名失敗" });
  }
};


