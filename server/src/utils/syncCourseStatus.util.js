import courseModel from "../models/course.model.js"

const updateCourseStatus = async () => {

    // date object of the current time and date
    const now = new Date();

    // setting up upcoming to ongoing
    await courseModel.updateMany(
        {
            status: "upcoming",
            start_date: { $lte: now }
        },
        { $set: { status: "ongoing" } }
    );

    // setting up ongoing to completed
    await courseModel.updateMany(
        {
            status: "ongoing",
            end_date: { $ne: null, $lte: now }
        },
        { $set: { status: "completed" } }
    )
}

export default updateCourseStatus;