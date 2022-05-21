import express from 'express';
import { signin, signup, singleUser, updateSingleUser } from '../controller/user.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/singleuser/:id', auth, singleUser);
router.patch('/updatesingleuser/:id', auth, updateSingleUser);
export default router;