// 管理 students
import pool from '../db.js';

class User {
  static async getAllUsers() {
    const [rows] = await pool.query('SELECT * FROM user');
    return rows;
  }

  static async getUserById(id) {
    const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?', [id]);
    return rows[0];
  }
}

export default User;

