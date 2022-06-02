import { Router } from "express";
import {
  createRoom,
  getRoomById,
  updateRoom,
  getRooms,
  deleteRoom,
} from "../controller/roomController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.route("/").get(getRooms).post(auth, createRoom);
router.route("/:id").put(auth, updateRoom).get(getRoomById).delete(auth, deleteRoom);


export default router;
