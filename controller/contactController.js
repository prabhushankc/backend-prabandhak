import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// @description   Contact admin
// @route         POST /api/contact
// @access        Private
const contactAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, comment } = req.body;

  const contact = new Contact({
    user: req.userId,
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
  const getAllContactDetail = await Contact.find({}).populate({
    path: "user",
    select: ["role"],
    strictPopulate: false,
  });

  res.json(getAllContactDetail);
});

// @description   Delete contact
// @route         DELETE /api/contact/:id
// @access        Private/Admin
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  await contact.remove();

  res.json({ message: "Contact Deleted Successfully" });
});

export { contactAdmin, getAllContacts, deleteContact };
