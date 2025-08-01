const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    // res.status(200).json({ Contact_List: contacts});
    res.status(200).json({ Contacts: contacts });
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findOne({ _id: req.params.id, user_id: req.user.id });
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found or access denied!");
    }

    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You do not have permission to update this contact.")
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("You do not have permission to delete this contact.")
    }
    await contact.deleteOne();
    res.status(200).json({ message: "Contact deleted successfully!" });
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };