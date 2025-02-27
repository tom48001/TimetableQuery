import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';  //  確保有引入
import teacherRoutes from "./routes/teacherRoutes.js";

const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true })); //  CORS 設定
app.use(bodyParser.json()); //  確保可以讀取 JSON

// 確保 API 路徑正確
app.use('/api', authRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));
