import express from 'express';
import {
  register,
  verifyOTP,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword
} from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/verifyOTP', verifyOTP);
router.post('/login', login); // No authentication needed here
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);

// Protected routes (authenticated users only)
router.get('/logout', isAuthenticated, logout); // User must be logged in to logout
router.get('/me', isAuthenticated, getUser); // User must be logged in to get their profile
router.put('/password/update', isAuthenticated, updatePassword); // User must be logged in to update their password

export default router;
