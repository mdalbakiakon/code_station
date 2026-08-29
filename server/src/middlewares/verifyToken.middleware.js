import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/tokenBlacklist.model.js";

// middleware for token verification
const verifyToken = async (req, res, next) => {
    try {
        
        // fetching token from client end
        const foundToken = req.cookies.CODE_STATION_TOKEN;

        // if token not found
        if (!foundToken) {
            return res.status(401).json({
                message: "unauthorized user"
            })
        }

        // decode foundToken
        const decoded = jwt.verify(foundToken, process.env.JWT_SECRET);

        // checking if the token is in blacklist or not
        const isBlacklisted = await tokenBlacklistModel.exists({
            jti: decoded.jti
        });

        // if the token is in blacklisted
        if(isBlacklisted){
            return res.status(401).json({
                message: 'expired session'
            })
        }

        // downstream user data
        req.user = {
            id: decoded.id,
            role: decoded.role,
            token_jti: decoded.jti,
            token_exp: decoded.exp
        }

        next();

    } catch (error) {
        console.log(error);

        // if token is malformed or expired
        if (error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "invalid or expired session"
            });
        }

        // fallback error handling
        return res.status(500).json({
            message: "something went wrong in token verification",
            error: error.message
        })
    }
}

export default verifyToken;