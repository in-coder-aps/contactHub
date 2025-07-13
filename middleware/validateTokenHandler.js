const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User=require("../models/userModel");

const validateToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401);
            throw new Error("Unauthorized: Token missing after Bearer");
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Unauthorized: Invalid or expired token");
            }

            const user = decoded.user;

            if (!user || !user.id || !user.username || !user.email) {
                res.status(401);
                throw new Error("Unauthorized: Invalid token payload");
            }

            //Check if user still exists in the DB
            const userFromDb = await User.findById(user.id);
            if (!userFromDb) {
                res.status(401);
                throw new Error("Unauthorized: User no longer exists");
            }

            req.user = user;
            return next();
        });

    } else {
        res.status(401);
        throw new Error("Unauthorized: Missing or malformed Authorization header");
    }
});

module.exports = validateToken;
