import express from 'express';
import { getUserDetails } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', protect, getUserDetails);

export default router;
