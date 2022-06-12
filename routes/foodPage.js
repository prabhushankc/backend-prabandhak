import express from "express";
import { getFoodPage, createFoodPage, deleteFood, updateFoodPage } from "../controller/foodPage.js";
import { auth, checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getFoodPage);
router.post("/", checkAdmin, createFoodPage);
router.patch("/:id", checkAdmin, updateFoodPage);
router.delete('/deletefood/:id', checkAdmin, deleteFood)
export default router;