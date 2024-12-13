import User from '../models/userModel.js';

const authMiddleware = async (req, res, next) => {
  console.log("req.session.userId:", req.session.userId); 
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Utilisateur non authentifié' });
  }

  try {
    const user = await User.findById(req.session.userId);
    console.log("Utilisateur trouvé:", user); 
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }


    console.log("Rôle de l'utilisateur:", user.id_roles);
    if (user.id_roles !== 1) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Erreur dans le middleware d'authentification:", error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};


export default authMiddleware;
