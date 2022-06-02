import { Router } from "express";
import {
  createRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controller/roomController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.route("/").get(getRooms).post(auth, createRoom);
router.route("/:id").put(auth, updateRoom).get(getRoomById);

export default router;
