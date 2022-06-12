import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// @description   Contact admin
// @route         POST /api/contact
// @access        Private
const contactAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, comment } = req.body;

  const contact = new Contact({
    firstName,
    lastName,
    email,
    comment,
  });

  const contactData = await contact.save();

  res.status(201).json(contactData);
});

// @description   Get all contacts admin
// @route         GET /api/contact
// @access        Private/Admin
const getAllContacts = asyncHandler(async (req, res) => {
  const getAllContactDetail = await Contact.find({});

  res.json(getAllContactDetail);
});

export { contactAdmin, getAllContacts };
