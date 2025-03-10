import express from 'express';
import { doctorController } from '../controllers/doctorController.js';
import { authMiddleware } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();


router.post('/profile-picture',
	authMiddleware,
	upload.single('profilePicture'),
	doctorController.updateProfilePicture
);
// Public routes
router.post('/register', doctorController.register);
router.get('/', doctorController.getAllDoctors);


export default router;

