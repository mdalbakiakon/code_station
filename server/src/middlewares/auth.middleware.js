import jwt from "jsonwebtoken";
import blacklistModel from "../models/blacklist.model.js";


// user input for register and login validation middleware
const inputValidation = async (req, res, next) => {
    try {

        // user input values
        const { identifier, password, role } = req.body;

        // role based req handle
        // if the role is not given
        if (!req.body.role) {
            req.role = "student"
        };

        // if given from the client input
        req.role = role;

        // if user gives null empty undefined input value
        if (!identifier || !password) {
            return res.status(400).json({
                message: "credentials can't be empty"
            });
        }

        // handling edge case if identifier input from user like "       "
        if (identifier.trim() === "") {
            return res.status(400).json({
                message: "identifier can't be empty"
            });
        }

        // checking the identifier is email or username based
        if (identifier.includes('@')) {
            req.identifierType = 'email';
            req.email = identifier.trim();
        } else {
            req.identifierType = 'username';
            req.username = identifier.trim();
        }

        // taking password into req.password to pass next
        req.password = password;
        next();

    } catch (error) {
        console.log(error);

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong while user input validation",
            error: error.message
        })
    }
}


// verify user token and check in blacklist
const verifyToken = async (req, res, next) => {
    try {

        // fetch client side token
        const foundToken = req.cookies.CODE_STATION_TOKEN;

        // if token not found
        if (!foundToken) {
            return res.status(401).json({
                message: 'unauthorized user'
            })
        }

        // if token found then verify it
        const decoded = jwt.verify(foundToken, process.env.JWT_SECRET);

        // if founded token is in blacklist
        const inBlacklist = Boolean(await blacklistModel.exists({
            jti: decoded.jti
        }));

        // if it is in blackList
        if (inBlacklist) {
            return res.status(401).json({
                message: 'session expired'
            })
        };

        // if not in blacklist and jwt.verify also throw no error
        req.user = {
            id: decoded.id,
            role: decoded.role,
            jti: decoded.jti,
            exp: decoded.exp
        }

        // downstream data;
        next();

    } catch (error) {
        console.log(error);

        // if decoded was malformed or expired
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "token was malformed or expired"
            })
        }

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in token verification",
            error: error.message
        })
    }
}


// verify if user is admin or not
const authAdmin = async (req, res, next) => {
    try {
        // giving permission only to admin
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "user has no permission to proceed"
            })
        }

        // downstream flow
        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "something went wrong in authenticating admin",
            error: error.message
        })
    }
}


// verify if user is instructor or not
const authInstructor = async (req, res, next) => {
    try {
        // giving permission only to admin
        if (req.user.role !== "instructor") {
            return res.status(403).json({
                message: "user has no permission to proceed"
            })
        }

        // downstream flow
        next();

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "something went wrong in authenticating instructor",
            error: error.message
        })
    }
}


export default { inputValidation, verifyToken, authAdmin, authInstructor };