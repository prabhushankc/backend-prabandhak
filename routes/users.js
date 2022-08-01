const express = require("express");
const {
  signin,
  signup,
  singleUser,
  updateSingleUser,
  deleteUser,
  addCart,
  getVerified,
  incrementCart,
  deleteaCart,
  reportData,
  getUsers,
} = require("../controller/user.js");
const { auth, checkAdmin } = require("../middleware/auth.js");
const router = express.Router();
router.get("/users", checkAdmin, getUsers);
router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:id/verify/:token", getVerified);
router.get("/singleuser/:id", auth, singleUser);
router.patch("/updatesingleuser/:id", auth, updateSingleUser);
router.delete("/deleteuser/:id", auth, deleteUser);
router.patch("/addcart", auth, addCart);
router.patch("/increment/:id", auth, incrementCart);
router.patch("/dltcart/:id", auth, deleteaCart);
router.post("/report/:userId", auth, reportData);

module.exports = router;
