import { Router } from "express";
import {
  createRoom,
  getRooms,
  deleteRoom,
} from "../controller/roomController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.route("/").get(getRooms).post(auth, createRoom);
router.route("/:id").delete(auth, deleteRoom);

export default router;
