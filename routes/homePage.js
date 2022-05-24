import express from "express";
import { getHomePage, createHomePage } from "../controller/homePage.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", getHomePage);
router.post("/", auth, createHomePage);
export default router;