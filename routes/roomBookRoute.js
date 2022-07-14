const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middleware/auth.js");
const {
  addBookRooms,
  deleteBookedRooms,
  getBookedRooms,
  getMyBookedRooms,
  getBookedRoomById,
  updateRoomApproval,
  updateRoomPayment,
} = require("../controller/roomBookController.js");

router
  .route("/:id")
  .get(auth, getBookedRoomById)
  .post(auth, addBookRooms)
  .delete(auth, deleteBookedRooms);
router.route("/").get(auth, isAdmin, getBookedRooms);
router.route("/my/own").get(auth, getMyBookedRooms);
router.route("/:id/approve").put(auth, isAdmin, updateRoomApproval);
router.route("/:id/payment").put(auth, updateRoomPayment);

module.exports = router;
