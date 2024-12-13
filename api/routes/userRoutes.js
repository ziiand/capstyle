import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import { getUserProfile, updateUserProfile } from '../controllers/userProfileController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authMiddleware, getUserProfile); 
router.put('/profile', updateUserProfile);
router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenue dans le tableau de bord', user: req.user });
});

export default router;


