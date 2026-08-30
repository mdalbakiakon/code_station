import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import profileController from "../controllers/profile.controller.js";
import multer from "multer";

// build router for profile
const router = express.Router();

// multer middleware for file upload
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5 mb max
});



// GET -- get user profile
router.get('/me', authMiddleware.verifyToken, profileController.userProfile);

// PATCH -- update user profile text based info
router.patch('/me', authMiddleware.verifyToken, profileController.updateProfile);

// POST -- upload profile picture
router.post('/me/upload-avatar', authMiddleware.verifyToken, upload.single('avatar'), profileController.uploadProfilePic);

// POST -- upload cover picture
router.post('/me/upload-cover', authMiddleware.verifyToken, upload.single('cover'), profileController.uploadCoverPic);

// PATCH -- update user password
router.patch('/me/password', authMiddleware.verifyToken, profileController.changePassword);

export default router;