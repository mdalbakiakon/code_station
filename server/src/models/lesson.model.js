import mongoose from "mongoose";
import handleTitleCase from "../utils/handleTitleCase.util.js";

// lesson schema
const lessonSchema = new mongoose.Schema({
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses",
        required: [true, "course reference is required"]
    },
    title: {
        type: String,
        required: [true, "lesson title is required"],
        trim: true,
        set: handleTitleCase
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    video_url: {
        type: String,
        trim: true,
        default: ""
    },
    video_public_id: {
        type: String,
        trim: true,
        default: ""
    },
    video_resource_type: {
        type: String,
        trim: true,
        default: ""
    },
    content: {
        type: String,
        default: "",
        trim: true
    },
    content_public_id: {
        type: String,
        trim: true,
        default: ""
    },
    content_resource_type: {
        type: String,
        trim: true,
        default: ""
    },
    order: {
        type: Number,
        required: [true, "lesson order is required"],
        min: 0
    }
}, { timestamps: true });

// course id and order together will be a unique record therefor
lessonSchema.index({ course_id: 1, order: 1 }, { unique: true });

const lessonModel = mongoose.model("lessons", lessonSchema);

export default lessonModel;