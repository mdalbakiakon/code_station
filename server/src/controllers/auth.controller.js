import userModel from "../models/user.model.js";
import authUtil from "../utils/auth.util.js";

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
        const {email, password, role} = req;


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
        const {email, username, password, identifierType} = req

        // var declaration for global scope
        let foundUser;

        // search based on identifier type
        if(identifierType === 'email'){
            foundUser = await userModel.findOne({
                email: email
            }).select("+password")
        }else{
            foundUser = await userModel.findOne({
                username: username
            }).select("+password")
        }

        // if there is no user found
        if(!foundUser){
            return res.status(401).json({
                message: "no user found"
            })
        }

        // check for password from database hashed password
        const isPasswordValid = await foundUser.comparePassword(password);

        // if password did not match
        if(!isPasswordValid){
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


export default { registerUser, loginUser };