import express from 'express';
import db from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// 🔹**中間件：檢查是否為管理員**
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // 取得 JWT Token
  if (!token) return res.status(401).json({ error: '未授權訪問，請登入' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'manager') {
      return res.status(403).json({ error: '只有管理員可以訪問' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: '無效的 Token' });
  }
};

// ✅ **取得老師列表 (只允許管理員)**
router.get('/teachers', isAdmin, async (req, res) => {
  try {
    const [teachers] = await db.query('SELECT user_id, user_name, email FROM user WHERE role = "teacher"');
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '無法獲取老師列表' });
  }
});

// ✅ **新增老師 (只允許管理員)**
router.post('/teachers', isAdmin, async (req, res) => {
  const { user_name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO user (user_name, email, password_hash, role) VALUES (?, ?, ?, "teacher")',
                   [user_name, email, hashedPassword]);
    res.json({ message: '老師新增成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '無法新增老師' });
  }
});

// ✅ **編輯老師 (只允許管理員)**
router.put('/teachers/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  const { user_name, email, newPassword } = req.body;
  try {
    let query = 'UPDATE user SET user_name = ?, email = ? WHERE user_id = ?';
    let params = [user_name, email, id];

    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      query = 'UPDATE user SET user_name = ?, email = ?, password_hash = ? WHERE user_id = ?';
      params = [user_name, email, hashedPassword, id];
    }

    await db.query(query, params);
    res.json({ message: '老師更新成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '無法更新老師' });
  }
});

// ✅ **刪除老師 (只允許管理員)**
router.delete('/teachers/:id', isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM user WHERE user_id = ?', [id]);
    res.json({ message: '老師刪除成功' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '無法刪除老師' });
  }
});

export default router;
