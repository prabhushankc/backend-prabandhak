import express from "express";
import { getFoodPage, createFoodPage, updateFoodPage } from "../controller/foodPage.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getFoodPage);
router.post("/", checkAdmin, createFoodPage);
router.patch("/:id", checkAdmin, updateFoodPage);
export default router;