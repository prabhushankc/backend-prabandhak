const express = require("express");
const router = express.Router();
const {
  contactAdmin,
  getAllContacts,
  updateContactStatus,
  deleteContact,
} = require("../controller/contactController.js");
const { auth, isAdmin } = require("../middleware/auth.js");

router.route("/").post(auth, contactAdmin).get(auth, isAdmin, getAllContacts);
router.route("/:id/resolve").put(auth, isAdmin, updateContactStatus);
router.route("/:id").delete(auth, isAdmin, deleteContact);

module.exports = router;
