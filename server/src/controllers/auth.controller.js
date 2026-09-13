import blacklistModel from "../models/blacklist.model.js";
import userModel from "../models/user.model.js";
import authUtil from "../utils/auth.util.js";
import generateVarificationCode from "../utils/generateVerificationCode.util.js";
import resetModel from "../models/reset.model.js";
import buildResetPasswordEmail from "../utils/buildResetPasswordEmail.util.js";
import sendEmail from "../services/sendEmail.service.js";
import { hashCryptoCode } from "../utils/cryptoHash.util.js";

// POST -- /api/auth/register
const registerUser = async (req, res) => {
    try {

        // from middleware if the identifier is not email
        if (req.identifierType !== 'email') {
            return res.status(400).json({
                message: 'valid email is required to register'
            })
        }

        // user input from middleware
        const { email, password } = req;

        // registration always creates a student — instructor/admin roles
        // are only granted later via admin PATCH, never chosen at signup
        const role = "student";

        // checking if exist user
        const isUserExist = await userModel.exists({
            email
        })


        // if user exists
        if (isUserExist) {
            return res.status(409).json({
                message: "user is already registered"
            })
        };


        // creating new user
        const newUser = await userModel.create({
            email,
            password,
            role
        })


        // showing user without hashed password
        const showUser = newUser.toObject();
        delete showUser.password;

        // generating token
        const token = authUtil.generateToken(newUser);

        // saving token
        authUtil.setAuthCookie(res, token);

        // returning success message
        return res.status(201).json({
            message: "user created successfully",
            new_user: showUser
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: 'something went wrong',
            error: error.message
        })
    }
}


// POST -- /api/auth/login
const loginUser = async (req, res) => {
    try {

        // from middleware
        const { email, username, password, identifierType } = req

        // var declaration for global scope
        let foundUser;

        // search based on identifier type
        if (identifierType === 'email') {
            foundUser = await userModel.findOne({
                email: email
            }).select("+password")
        } else {
            foundUser = await userModel.findOne({
                username: username
            }).select("+password")
        }

        // if there is no user found
        if (!foundUser) {
            return res.status(401).json({
                message: "no user found"
            })
        }

        // check for password from database hashed password
        const isPasswordValid = await foundUser.comparePassword(password);

        // if password did not match
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "wrong password encountered"
            })
        }

        // generating jwt token
        const token = authUtil.generateToken(foundUser);

        // saving token in cookie
        authUtil.setAuthCookie(res, token);

        // final success message
        return res.status(200).json({
            message: "user login successful"
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in user login",
            error: error.message
        })
    }
}


// POST -- /api/auth/logout
const logoutUser = async (req, res) => {
    try {

        // inster the tokens jti and exp data to blacklist collection
        await blacklistModel.create({
            jti: req.user.jti,
            expiresAt: new Date(req.user.exp * 1000)
        })

        // clearing cookie from client side
        res.clearCookie("CODE_STATION_TOKEN", {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production"
        })

        // success message
        return res.status(200).json({
            message: "user logout successful"
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in user logout",
            error: error.message
        })
    }
}


// POST -- /api/auth/forget-password
const forgotPassword = async (req, res) => {
    try {

        // find user by whichever identifier was validated
        const query = req.email ? { email: req.email } : { username: req.username };

        const user = await userModel.findOne(query);

        // if no user found with that identifier
        if (!user) {
            return res.status(404).json({
                message: "no account found with this identifier"
            });
        }

        // generate verification code and email it
        const getCode = generateVarificationCode();
        const hashedCode = hashCryptoCode(getCode);

        // save the hashed in the db
        await resetModel.findOneAndUpdate(
            { userId: user._id },
            {
                code: hashedCode,
                expiresAt: new Date(Date.now() + 10 * 60 * 1000)
            },
            { upsert: true, returnDocument: 'after' }
        );

        // build and send the email
        const emailHtml = buildResetPasswordEmail(getCode);

        // using resend send email
        await sendEmail({
            to: user.email,
            subject: "CodeStation - Reset Password Code",
            html: emailHtml
        })

        return res.status(200).json({
            message: "verification code sent to your email"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "something went wrong in forgotPassword",
            error: error.message
        });
    }
}

// POST -- /api/auth/reset-password
const resetPassword = async (req, res) => {
    try {
        const { code, newPassword } = req.body;
        const hashedCode = hashCryptoCode(code);

        const resetRecord = await resetModel.findOne({ code: hashedCode });

        if (!resetRecord) {
            return res.status(400).json({ message: "invalid or expired verification code" });
        }

        // if fall under 60s expire window
        if (resetRecord.expiresAt < new Date()) {
            await resetModel.deleteOne({ _id: resetRecord._id });
            return res.status(400).json({ message: "verification code has expired, please request a new one" });
        }

        const user = await userModel.findById(resetRecord.userId);
        if (!user) {
            return res.status(404).json({ message: "no account found for this reset request" });
        }

        // adding the new password
        user.password = newPassword;
        await user.save();

        await resetModel.deleteOne({ _id: resetRecord._id });

        return res.status(200).json({ message: "password reset successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "something went wrong in resetPassword", error: error.message });
    }
}

export default { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };