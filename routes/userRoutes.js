const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        message: "Too many attempts, please try again after 15 minutes"
    }
});

// Public routes
// .all() catches invalid HTTP methods and responds with 405
router.route("/register").post(authLimiter, registerUser).all((req, res) => {
    res.status(405).json({ message: `${req.method} not allowed on /register` });
});

router.route("/login").post(authLimiter, loginUser).all((req, res) => {
    res.status(405).json({ message: `${req.method} not allowed on /login` });
});

// Protected routes
router.use(validateToken);

router.route("/current").get(currentUser).all((req, res) => {
    res.status(405).json({ message: `${req.method} not allowed on /current` });
});

module.exports = router;
