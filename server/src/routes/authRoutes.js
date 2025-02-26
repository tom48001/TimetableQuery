import express from 'express';
import bcrypt from 'bcrypt';
import db from '../db.js';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check if email exists in database
    const query = 'SELECT * FROM user WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.user_id, role: user.role },
            'secret_key', // Change this to an environment variable
            { expiresIn: '1h' }
        );

        res.json({ success: true, token, role: user.role });
    });
});

export default router;

