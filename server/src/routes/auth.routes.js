import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// router setup
const router = express.Router();


// POST -- registration
router.post('/register', authMiddleware.inputValidation, authController.registerUser);

// POST -- login
router.post('/login', authMiddleware.inputValidation, authController.loginUser);

// POST -- logout
router.post('/logout', authMiddleware.verifyToken, authController.logoutUser);

export default router;