import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import courseController from "../controllers/course.controller.js";
import multer from "multer";
import authController from "../controllers/auth.controller.js";
import courseMiddleware from "../middlewares/course.middleware.js";
import lessonController from "../controllers/lesson.controller.js";

const router = express.Router();
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5mb max
});

const lessonUpload = multer({storage: multer.memoryStorage()});

// create course only by admin
router.post('/', authMiddleware.verifyToken, authMiddleware.authAdmin, upload.single("thumbnail"), courseController.createCourse);

// get all courses with two separate array as upcoming and ongoing
router.get('/', authMiddleware.verifyToken, courseController.getAllCourses);

// get all lessons belonging to a specific course
router.get('/:courseId', authMiddleware.verifyToken, lessonController.getAllLessonsOfCourse);

// creat lesson by assigned instructor only
router.post('/:courseId', authMiddleware.verifyToken, authMiddleware.authInstructor, courseMiddleware.isCourseInstructor, lessonUpload.fields([
    {name: 'content', maxCount: 1},
    {name: 'video', maxCount: 1}
]), lessonController.createLesson);


export default router;