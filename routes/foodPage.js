import express from "express";
import { getFoodPage, createFoodPage } from "../controller/foodPage.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getFoodPage);
router.post("/", checkAdmin, createFoodPage);
export default router;