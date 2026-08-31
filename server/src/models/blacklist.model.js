import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    jti: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

// expire token as it expires
blacklistSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});

const blacklistModel = mongoose.model("blacklists", blacklistSchema);

export default blacklistModel;