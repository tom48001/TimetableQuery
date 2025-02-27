import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 確保 email 和 password 不是空的
    if (!email || !password) {
      return res.status(400).json({ error: "請輸入帳號和密碼" });
    }

    // 查詢用戶
    const [user] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

    if (!user.length) {
      return res.status(401).json({ error: "帳號不存在" });
    }

    // 取得加密後的密碼
    const storedPassword = user[0].password_hash;
    if (!storedPassword) {
      return res.status(500).json({ error: "密碼資料錯誤，請聯繫管理員" });
    }

    // bcrypt 比對密碼
    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "密碼錯誤" });
    }

    // 確保 role 存在，否則預設為 teacher
    const userRole = user[0].role ? user[0].role.trim().toLowerCase() : 'teacher';
    console.log("從資料庫獲取的 role:", user[0]); // 應該輸出 "manager" 或 "teacher"

    // 產生 JWT Token
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "伺服器密鑰未設置，請聯繫管理員" });
    }

    const token = jwt.sign({ user_id: user[0].user_id, email, role: userRole }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 回傳 `role`，確保 `localStorage` 存正確的值
    res.json({ message: "登入成功", user: user[0], token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "伺服器錯誤，請稍後再試" });
  }
});

export default router;
