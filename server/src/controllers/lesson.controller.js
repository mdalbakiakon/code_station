import mongoose from "mongoose";
import courseModel from "../models/course.model.js";
import lessonModel from "../models/lesson.model.js";
import { cloudUpload } from "../services/storage.service.js";


// GET /api/courses/:id/ -- get all lessons from the course
const getAllLessonsOfCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        // if the param id is not a valid mongodb objectid
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return res.status(401).json({
                message: "course id is not valid"
            })
        };

        // if valid but check for is the course available or not
        const foundCourse = await courseModel.findById(courseId);

        // if foundCourse is not available or not found
        if (!foundCourse) {
            return res.status(404).json({
                message: "course not found"
            })
        };

        // if course is available we will get all the lessons
        const foundLessonList = await lessonModel.find({ course_id: courseId })
            .sort({ order: 1 });

        // response success
        return res.status(200).json({
            message: "fetched all lessons successfully",
            found_lessons: foundLessonList
        })
    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in fetching lessons for the course",
            error: error.message
        })
    }

}




// POST /api/course/:courseId -- create course only restricted to assigned instructor
const createLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, order } = req.body;

        const contentFile = req.files?.content?.[0];
        const videoFile = req.files?.video?.[0];

        let contentURL = "";
        let contentPublicId = "";
        let contentResourceType = "";
        let videoURL = "";
        let videoPublicId = "";
        let videoResourceType = "";


        if (contentFile) {
            const cloudResponse = await cloudUpload(contentFile.buffer, contentFile.mimetype, "content", req.user.id);
            contentURL = cloudResponse.secure_url;
            contentPublicId = cloudResponse.public_id;
            contentResourceType = cloudResponse.resource_type;
        }

        if (videoFile) {
            const cloudResponse = await cloudUpload(videoFile.buffer, videoFile.mimetype, "video", req.user.id);
            videoURL = cloudResponse.secure_url;
            videoPublicId = cloudResponse.public_id;
            videoResourceType = cloudResponse.resource_type;
        }

        const newLesson = await lessonModel.create({
            course_id: courseId,
            title,
            description,
            content: contentURL,
            content_public_id: contentPublicId,
            content_resource_type: contentResourceType,
            video_url: videoURL,
            video_public_id: videoPublicId,
            video_resource_type: videoResourceType,
            order
        });

        return res.status(201).json({
            message: "Lesson created successfully",
            new_lesson: newLesson
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "something went wrong in creating lesson for the course",
            error: error.message
        });
    }
};

export default { getAllLessonsOfCourse, createLesson };