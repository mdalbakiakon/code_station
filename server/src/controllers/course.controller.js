import courseModel from "../models/course.model.js";
import userModel from "../models/user.model.js";
import cloudUpload from "../services/storage.service.js";
import updateCourseStatus from "../utils/syncCourseStatus.util.js";



// POST /api/courses/ -- post/create a new courses only restricted to admin
const createCourse = async (req, res) => {
    try {
        // taking input from admin
        const { title,
            description,
            level,
            price,
            start_date,
            end_date } = req.body;

        // from frontend the data comes as string as by default formData use text or file sending manner so we need to parse our array
        let instructors = req.body.instructors;
        instructors = JSON.parse(instructors);

        // in schema required true only sees if an array is given even if it is an empty array so we validate in api if the array is really empty or not
        if (!Array.isArray(instructors) || instructors.length === 0) {
            return res.status(400).json({
                message: "instructors should be given in a array and instructor array can't be empty"
            })
        }

        // find users from database
        const foundUser = await userModel.find({ _id: { $in: instructors } });

        // if some instructor are not found
        if (foundUser.length !== instructors.length) {
            return res.status(401).json({
                message: "some instructors are not found"
            })
        }

        // if all found but role check for instructor
        const areAllInstructors = foundUser.every((user) => user.role === "instructor");

        // if all found users are valid but all are not instructors
        if (!areAllInstructors) {
            return res.status(403).json({
                message: "some instances of provided array are not instructor"
            })
        };

        // created by which admin
        const created_by = req.user.id;

        // image file 
        const file = req.file;

        // if file not found or empty
        if (!file) {
            return res.status(400).json({
                message: "thumbnail image is required"
            })
        }

        // upload to cloudinary
        const cloudResponse = await cloudUpload(file.buffer, file.mimetype, "thumbnail", req.user.id);

        // thumbnail url
        const thumbnailURL = cloudResponse.secure_url;

        // creating new course
        const newCourse = await courseModel.create({
            title,
            description,
            instructors,
            thumbnail_img: thumbnailURL,
            level,
            price,
            start_date,
            end_date,
            created_by
        })

        // success response
        return res.status(201).json({
            message: "course created successfully",
            new_course: newCourse
        })
    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong while creating course",
            error: error.message
        })
    }
};


// GET /api/courses/ -- get all courses and make two separate arrays for upcoming and ongoing
const getAllCourses = async (req, res) => {
    try {
        // sync/update course status in database
        await updateCourseStatus();

        // making arrays with the parallel fetch from database
        const [upcomingCourses, ongoingCourses] = await Promise.all([
            courseModel.find({ status: "upcoming" }),
            courseModel.find({ status: "ongoing" })
        ]);

        // returning success response
        return res.status(200).json({
            message: "courses fetched successfully",
            upcoming_course_list: upcomingCourses,
            ongoing_course_list: ongoingCourses
        });
    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "Something went wrong while fetching all courses",
            error: error.message
        });
    }
};

export default { createCourse, getAllCourses };