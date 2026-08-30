import jwt from "jsonwebtoken";
import crypto from "crypto";

// generate token
const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        role: user.role,
        jti: crypto.randomUUID()
    },
        process.env.JWT_SECRET,
        { expiresIn: "1d" });
};

// setting cookie in client end
const setAuthCookie = (res, token) => {
    res.cookie("CODE_STATION_TOKEN",
        token,
        {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000
        }
    )
};

export default { generateToken, setAuthCookie };