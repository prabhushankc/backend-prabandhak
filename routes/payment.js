const express = require("express");
const {
  getPayments,
  createPayment,
  getStatus,
  getPaymentClient,
  deletePaymentByUser,
} = require("../controller/paymentCtrl.js");
const { auth, checkAdmin } = require("../middleware/auth.js");
const router = express.Router();

router.get("/", auth, checkAdmin, getPayments);
router.get("/client", auth, getPaymentClient);
router.post("/", auth, createPayment);
router.patch("/:id", checkAdmin, getStatus);
router.delete("/:id", auth, deletePaymentByUser);
module.exports = router;
