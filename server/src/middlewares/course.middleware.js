import mongoose from "mongoose";
import courseModel from "../models/course.model.js";

// check if the instructor is assigned in the particular course or not to give permission in lesson editing
const isCourseInstructor = async(req, res, next) => {
    try {
        // from para get courseId
        const { courseId } = req.params;
        // instructor id from authInstructor
        const instId = req.user.id;

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

        // check if the user id "instructor" inside the assigned course instructors
        const isInstructorValid = foundCourse.instructors.some((id) => id.toString() === instId);

        // if isInstuctorValid not true
        if(!isInstructorValid){
            return res.status(403).json({
                message: "permission denied as instructor is not assigned to this course"
            })
        }

        // downstream
        next();
        
    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in authAdmin isInstructorAssigned",
            error: error.message
        })
    }
}

export default {isCourseInstructor};
