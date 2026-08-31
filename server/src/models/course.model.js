import mongoose from "mongoose";
import handleTitleCase from "../utils/handleTitleCase.util.js";

// course schema
const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "course title is required"],
        trim: true,
        set: handleTitleCase
    },
    description: {
        type: String,
        default: "",
        trim: true,
        maxlength: [5000, "description maximum length has exceeded"]
    },
    instructors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "instructors array required"]
    }],
    thumbnail_img: {
        type: String,
        required: [true, "course thumbnail is required"],
        trim: true
    },
    level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner"
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    start_date: {
        type: Date,
        required: [true, "course start date is required"]
    },
    end_date: {
        type: Date,
        validate: {
            validator: function (val) {
                if (!val) return true;
                return val > this.start_date;
            },
            message: "end date must be after start date"
        }
    },
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],
        default: "upcoming",
        index: true
    },
    enrolled_count: {
        type: Number,
        default: 0,
        min: 0
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
}, { timestamps: true });

const courseModel = mongoose.model("courses", courseSchema);

export default courseModel;