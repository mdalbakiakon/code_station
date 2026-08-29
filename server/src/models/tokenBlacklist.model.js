import mongoose from "mongoose";

// schema for token blacklist
const tokenBlacklistSchema = new mongoose.Schema({
    jti: {
        type: String,
        required: true,
        unique: true
    },

    expiresAt: {
        type: Date,
        required: true
    }
})

// delete record at expiresAt time dynamically
tokenBlacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const tokenBlacklistModel = mongoose.model("tokenBlacklists", tokenBlacklistSchema);

export default tokenBlacklistModel;