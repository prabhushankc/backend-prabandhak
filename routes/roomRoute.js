import { Router } from "express";
import {
  createRoom,
  getRoomById,
  updateRoom,
  getRooms,
  deleteRoom,
  createRoomReview,
  deleteRoomReview,
} from "../controller/roomController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.route("/").get(getRooms).post(auth, createRoom);
router
  .route("/:id")
  .put(auth, updateRoom)
  .get(getRoomById)
  .delete(auth, deleteRoom);
router.route("/:id/reviews").post(auth, createRoomReview);
router.route("/:id/:review_id").delete(auth, deleteRoomReview);

export default router;
