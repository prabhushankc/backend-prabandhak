import express from "express";
import { getHomePage, createHomePage, deleteHome } from "../controller/homePage.js";
import { checkAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getHomePage);
router.post("/", checkAdmin, createHomePage);
router.delete("/deleteHome/:id", checkAdmin, deleteHome);
export default router;