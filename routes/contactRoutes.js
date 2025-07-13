const express = require("express");
const router = express.Router();
const { getContacts, createContact, getContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
// .all() catches invalid HTTP methods and responds with 405
router.route("/").get(getContacts).post(createContact).all((req, res) => {
    res.status(405).json({ message: `${req.method} not allowed on /` })
});

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact).all((req, res) => {
    res.status(405).json({ message: `${req.method} not allowed on /:id` });
});

module.exports = router;