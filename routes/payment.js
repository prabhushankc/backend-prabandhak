import express from 'express';
import { getPayments, createPayment, getStatus } from '../controller/paymentCtrl.js'
import { auth, checkAdmin } from '../middleware/auth.js'
const router = express.Router()

router.get('/', auth, checkAdmin, getPayments);
router.post('/', auth, createPayment);
router.patch('/:id', checkAdmin, getStatus);
export default router;