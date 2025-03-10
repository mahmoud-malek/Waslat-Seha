import express from 'express';
import { medicalHistoryController } from '../controllers/medicalHistoryController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, medicalHistoryController.getPatientHistory);

export default router;