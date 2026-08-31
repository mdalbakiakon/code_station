import blacklistModel from "../models/blacklist.model.js";
import userModel from "../models/user.model.js";
import { cloudDelete, cloudUpload } from "../services/storage.service.js";

// GET /api/users/me -- to get user profile data
const userProfile = async (req, res) => {
    try {
        // from token verify we get the req.user.id
        const foundProfile = await userModel.findById(req.user.id);

        // even if after token verification but we dont find the user in database
        if (!foundProfile) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        // return success response
        return res.status(200).json({
            message: "user profile found successfully",
            user_profile: foundProfile
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in getting user profile",
            error: error.message
        })
    }

}


// PATCH /api/users/me -- update profile info
const updateProfile = async (req, res) => {
    try {

        // restriction to other field
        const allowedFields = ['first_name', 'last_name', 'bio'];

        // making objects of new updates defining blank object
        const updates = {};

        // check for if user gives input in that specific field then update the updates object
        for (const key of allowedFields) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        // check for if user didnt give any input at all
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "no update happens due to no field value input"
            });
        }

        // updating profile
        const updatedProfile = await userModel.findByIdAndUpdate(
            req.user.id,
            updates,
            { returnDocument: "after", runValidators: true }
        );

        // if update failed due to user not found and update didnt happend
        if (!updatedProfile) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        // return success message
        return res.status(201).json({
            message: "user profile updated successfully",
            update_profile: updatedProfile
        });

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in profile update",
            error: error.message
        });
    }
};


// POST /api/users/me/upload-avatar
const uploadProfilePic = async (req, res) => {
    try {

        // fetching image file from req
        const avatar = req.file;

        // if file not found
        if (!avatar) {
            return res.status(400).json({
                message: 'profile image not provided'
            })
        }

        // if avatar found upload it to cloud
        const cloudResponse = await cloudUpload(avatar.buffer, avatar.mimetype, "avatar", req.user.id);

        // if success if error it will go catch block anyway
        const updatedProfile = await userModel.findByIdAndUpdate(req.user.id, {
            "profile_img": cloudResponse.secure_url,
            "profile_public_id": cloudResponse.public_id,
            "profile_resource_type": cloudResponse.resource_type,
        }, { returnDocument: 'after', runValidators: true })

        // success response
        return res.status(201).json({
            message: "profile picture uploaded successfully",
            update_profile: updatedProfile
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in upload profile picture",
            error: error.message
        })
    }
}


// POST /api/users/me/upload-cover
const uploadCoverPic = async (req, res) => {
    try {

        // fetching image file from req
        const cover = req.file;

        // if file not found
        if (!cover) {
            return res.status(400).json({
                message: 'cover image not provided'
            })
        }

        // if avatar found upload it to cloud
        const cloudResponse = await cloudUpload(cover.buffer, cover.mimetype, "cover", req.user.id);

        // if success if error it will go catch block anyway
        const updatedProfile = await userModel.findByIdAndUpdate(req.user.id, {
            "cover_img": cloudResponse.secure_url,
            "cover_public_id": cloudResponse.public_id,
            "cover_resource_type": cloudResponse.resource_type
        }, { returnDocument: 'after', runValidators: true })

        // success response
        return res.status(201).json({
            message: "cover picture uploaded successfully",
            update_profile: updatedProfile
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in upload cover picture",
            error: error.message
        })
    }
}


// PATCH /api/users/me/password
const changePassword = async (req, res) => {
    try {

        // fetch old_password, new_password, confirm_password
        const { old_password, new_password, confirm_password } = req.body;

        // if credentials are blank
        if (!old_password || !new_password || !confirm_password) {
            return res.status(400).json({
                message: "credentials may be empty"
            })
        }

        // find user by id and select password
        const foundUser = await userModel.findById(req.user.id).select("+password");

        // if user not found
        if (!foundUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        // checking if old password is matched or not
        const isMatched = await foundUser.comparePassword(old_password);

        // if old password not matched
        if (!isMatched) {
            return res.status(401).json({
                message: "old password is invalid"
            })
        }

        // check if new password is same as old password
        const isNewPasswordSame = await foundUser.comparePassword(new_password);

        // if same return
        if (isNewPasswordSame) {
            return res.status(400).json({
                message: "new password is same as old one"
            })
        }

        // if confirm password and new password entry are not same
        if (new_password !== confirm_password) {
            return res.status(401).json({
                message: "incorrect password confirmation"
            })
        }

        // using save() instead of update to trigger the schema bcrypt hashing
        foundUser.password = new_password;
        await foundUser.save();

        // return success message
        return res.status(201).json({
            message: "password updated successfully"
        })

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in password change",
            error: error.message
        })
    }
}


// DELETE /api/users/me/delete-profile
const deleteProfile = async (req, res) => {
    try {
        const deletedUser = await userModel.findOneAndDelete({
            _id: req.user.id
        });

        if (!deletedUser) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        // delete user resources in cloud
        if (deletedUser.profile_img) {
            // delete user profile picture
            await cloudDelete(deletedUser.profile_public_id, deletedUser.profile_resource_type);
        }

        if (deletedUser.cover_img) {
            // delete user profile picture
            await cloudDelete(deletedUser.cover_public_id, deletedUser.cover_resource_type);
        }

        // only blacklist + clear cookie AFTER confirming deletion succeeded
        await blacklistModel.create({
            jti: req.user.jti,
            expiresAt: new Date(req.user.exp * 1000)
        });

        res.clearCookie("CODE_STATION_TOKEN", {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production"
        });

        return res.status(200).json({
            message: 'account deleted successfully'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "something went wrong in deleting user account"
        });
    }
};


export default { userProfile, updateProfile, uploadProfilePic, uploadCoverPic, changePassword, deleteProfile };