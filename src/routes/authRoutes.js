import express from 'express';
import passport from 'passport';
import {
  registerUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from '../controllers/authController.js';
import { getUserDetails } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.get('/verify/:token', verifyUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.put('/reset/:token', resetPassword);
router.get('/profile', protect, getUserDetails);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

export default router;
