
import User from '../models/userModel.js'; 


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Erreur lors de la récupération du profil utilisateur:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId; 

    if (!userId) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    const { firstname, email, lastname } = req.body;
    await User.update(userId, { firstname, email, lastname });
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur:', err);
    res.status(500).json({ message: 'Server error' });
  }
};