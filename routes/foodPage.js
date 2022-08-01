const express = require("express");
const {
  getFoodPage,
  createFoodPage,
  deleteFood,
  updateFoodPage,
  getFoodBySearch,
  getFoodById,
  createCommentFood,
  deleteCommentFood,
} = require("../controller/foodPage.js");
const { auth, checkAdmin } = require("../middleware/auth.js");

const router = express.Router();
router.get("/", getFoodPage);
router.get("/search", getFoodBySearch);
router.post("/", checkAdmin, createFoodPage);
router.patch("/:id", checkAdmin, updateFoodPage);
router.delete("/deletefood/:id", checkAdmin, deleteFood);
router.patch("/comment/:id", auth, createCommentFood);
router.delete("/comment/:id/:cmtuserId", auth, deleteCommentFood);
router.get("/:id", getFoodById);
module.exports = router;
