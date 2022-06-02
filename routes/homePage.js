import express from "express";
import {
  getHomePage,
  createHomePage,
  deleteHome,
  updateHomePage,
} from "../controller/homePage.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getHomePage);
router.post("/", checkAdmin, createHomePage);
router.delete("/deleteHome/:id", checkAdmin, deleteHome);
router.patch("/:id", checkAdmin, updateHomePage);
export default router;
