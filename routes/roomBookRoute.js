import express from "express";
const router = express.Router();
import { auth, isAdmin } from "../middleware/auth.js";
import {
  addBookRooms,
  getBookedRooms,
  getMyBookedRooms,
} from "../controller/roomBookController.js";

router.route("/:id").post(auth, addBookRooms);
router.route("/").get(auth, isAdmin, getBookedRooms);
router.route("/me").get(auth, getMyBookedRooms);

export default router;
