import express from "express";
import { getFoodPage, createFoodPage, deleteFood, updateFoodPage, getFoodBySearch } from "../controller/foodPage.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getFoodPage);
router.get("/search", getFoodBySearch);
router.post("/", checkAdmin, createFoodPage);
router.patch("/:id", checkAdmin, updateFoodPage);
router.delete('/deletefood/:id', checkAdmin, deleteFood)
export default router;