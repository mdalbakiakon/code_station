import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
        const email = req.email;
        const password = req.password;
        const role = req.role;

        
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
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );


        // saving token
        res.cookie("CODE_STATION_TOKEN", token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000
            }
        )

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

export default { registerUser };