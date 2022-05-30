import express from "express";
import { getFoodPage, createFoodPage } from "../controller/foodPage.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", getFoodPage);
router.post("/", auth, createFoodPage);
export default router;