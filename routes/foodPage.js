import express from "express";
import { getFoodPage, createFoodPage, updateFoodPage, deleteFood } from "../controller/foodPage.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getFoodPage);
router.post("/", checkAdmin, createFoodPage);
router.patch("/:id", checkAdmin, updateFoodPage);
router.delete('/deletefood/:id', auth, deleteFood);
export default router;