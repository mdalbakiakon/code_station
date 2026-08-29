import mongoose from "mongoose";
import bcrypt from "bcrypt";


// convert each word into capitalize
const handleTitleCase = (val) => {
    return val.toLowerCase()
        .split(" ")
        .map((word)=>word.charAt(0).toUpperCase()+word.slice(1))
        .join(" ");
}


// user schema
const userSchema = new mongoose.Schema({

    // register/login auth
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        maxLength: [256, 'email is too long'],
        match: [/^\S+@\S+\.\S+$/, 'email is invalid']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minLength: [8, 'password must be at least 8 characters long'],
        select: false
    },
    username: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        sparse: true,
        match: [/^[a-z0-9_.]{5,20}$/, 'username must be between 5 to 20 characters (only lowercase alphabet, number, underscore and dot allowed)']
    },


    // profile
    first_name: {
        type: String,
        maxLength: [50, 'first name is too long'],
        default: "",
        set: handleTitleCase
    },

    last_name: {
        type: String,
        maxLength: [30, 'last name is too long'],
        default: "",
        set: handleTitleCase
    },

    bio: {
        type: String,
        maxLength: [500, 'bio is too long'],
        default: ""
    },

    role: {
        type: String,
        enum: ["instructor", "student"],
        default: "student"
    },

    profile_img: {
        type: String,
        trim: true,
        match: [/^https?:\/\/\S+$/, 'url is invalid'],
        default: ""
    },

    cover_img: {
        type: String,
        trim: true,
        match: [/^https?:\/\/\S+$/, 'url is invalid'],
        default: ""
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });



// password hashing before saving it to the database
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


// comparing password from database and typed password by user
userSchema.methods.comparePassword = async function (typedPassword) {
    return await bcrypt.compare(typedPassword, this.password);
}


// model
const userModel = mongoose.model("users", userSchema);


export default userModel;