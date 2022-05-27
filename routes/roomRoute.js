import { Router } from "express";
import { createRoom, getRooms } from "../controller/roomController.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.route("/").get(getRooms).post(auth, createRoom);

export default router;
