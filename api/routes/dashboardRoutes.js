
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: 'Bienvenue dans le tableau de bord, ' + req.user.firstname });
});


export default router;
