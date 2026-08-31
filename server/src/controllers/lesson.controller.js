import lessonModel from "../models/lesson.model.js";
import { cloudUpload } from "../services/storage.service.js";


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

export default { createLesson };