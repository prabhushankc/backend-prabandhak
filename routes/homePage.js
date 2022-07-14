const express = require("express");
const {
  getHomePage,
  createHomePage,
  deleteHome,
  updateHomePage,
} = require("../controller/homePage.js");
const { auth, checkAdmin } = require("../middleware/auth.js");

const router = express.Router();
router.get("/", getHomePage);
router.post("/", checkAdmin, createHomePage);
router.patch("/:id", checkAdmin, updateHomePage);
router.delete("/deleteHome/:id", checkAdmin, deleteHome);
module.exports = router;
