import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import courseController from "../controllers/course.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5mb max
});

// create course only by admin
router.post('/', authMiddleware.verifyToken, authMiddleware.authAdmin, upload.single("thumbnail"), courseController.createCourse);

// get all courses with two separate array as upcoming and ongoing
router.get('/', authMiddleware.verifyToken, courseController.getAllCourses);

export default router;