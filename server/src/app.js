import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';  // 引入 API 路由
import studentRoutes from './routes/studentRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// 設定 API 路由
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

