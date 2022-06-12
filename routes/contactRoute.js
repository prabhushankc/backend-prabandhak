import express from "express";
const router = express.Router();
import {
  contactAdmin,
  getAllContacts,
} from "../controller/contactController.js";
import { auth, isAdmin } from "../middleware/auth.js";

router.route("/").post(auth, contactAdmin).get(auth, isAdmin, getAllContacts);

export default router;
