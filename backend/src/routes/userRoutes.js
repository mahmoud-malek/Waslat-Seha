import express from "express";
import { userController } from "../controllers/userController.js";
import { authMiddleware, roleMiddleware } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// Protected routes
router.get("/profile", authMiddleware, userController.getUserById);
router.put("/profile", authMiddleware, userController.updateProfile);
router.put("/password", authMiddleware, userController.changePassword);

// Profile picture routes
router.post(
	"/profile-picture",
	authMiddleware,
	upload.single('profilePicture'),
	userController.updateProfilePicture
);
router.get("/profile-picture", authMiddleware, userController.getProfilePicture);

// Admin only routes
router.get("/", authMiddleware, roleMiddleware(['ADMIN']), userController.getUsers);
router.delete("/:id", authMiddleware, roleMiddleware(['ADMIN']), userController.deleteUser);

export default router;