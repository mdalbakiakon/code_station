import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

// router setup
const router = express.Router();


// POST -- registration
router.post('/register', authMiddleware.authInputValidation, authController.registerUser);


export default router;