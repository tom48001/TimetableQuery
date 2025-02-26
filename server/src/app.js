import express from 'express';
import session from 'express-session';
import cors from 'cors';  // ✅ Import cors
import passport from './auth.js';

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:8082', // Allow requests from Vue.js frontend
  credentials: true, // Allow cookies & authentication headers
}));

app.use(express.json());  // ✅ Enable JSON parsing
app.use(session({ secret: 'secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

