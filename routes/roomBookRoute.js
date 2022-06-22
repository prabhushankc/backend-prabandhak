import express from "express";
const router = express.Router();
import { auth, isAdmin } from "../middleware/auth.js";
import {
  addBookRooms,
  deleteBookedRooms,
  getBookedRooms,
  getMyBookedRooms,
} from "../controller/roomBookController.js";

router.route("/:id").post(auth, addBookRooms).delete(auth, deleteBookedRooms);
router.route("/").get(auth, isAdmin, getBookedRooms);
router.route("/me").get(auth, getMyBookedRooms);

export default router;
