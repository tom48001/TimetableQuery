import express from 'express';
import { getStudents } from '../controllers/studentController.js';

const router = express.Router();

router.get('/', getStudents);  //Route should match '/api/students'

export default router;

