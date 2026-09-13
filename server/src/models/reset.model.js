import mongoose from "mongoose";

const resetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// auto-delete once expired
resetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const resetModel = mongoose.model("resetCodes", resetSchema);

export default resetModel;