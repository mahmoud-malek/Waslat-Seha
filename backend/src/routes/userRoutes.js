import express from 'express';
import { userController } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();


router.get('/profile', authMiddleware, userController.getUserProfile);
router.get('/appointments', authMiddleware, userController.getAppointments);
router.get('/medical-history', authMiddleware, userController.getMedicalHistory);
router.put('/profile', authMiddleware, userController.updateProfile);
router.post('/profile-picture', authMiddleware, upload.single('profilePicture'), userController.updateProfilePicture);
export default router;