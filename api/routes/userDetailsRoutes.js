import express from 'express';
import UserDetails from '../models/userDetailsModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userDetails = await UserDetails.getAllUserDetails();
        res.json(userDetails);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des détails des utilisateurs' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userDetails = await UserDetails.getUserDetailsById(id);
        if (userDetails) {
            res.json(userDetails);
        } else {
            res.status(404).json({ message: 'Détails de l\'utilisateur non trouvés' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des détails de l\'utilisateur' });
    }
});

router.post('/', async (req, res) => {
    const { userId, firstName, lastName, address } = req.body;
    try {
        const newUserDetailsId = await UserDetails.createUserDetails(userId, firstName, lastName, address);
        res.status(201).json({ id: newUserDetailsId, message: 'Détails de l\'utilisateur créés avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création des détails de l\'utilisateur' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, address } = req.body;
    try {
        await UserDetails.updateUserDetails(id, firstName, lastName, address);
        res.json({ message: 'Détails de l\'utilisateur mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour des détails de l\'utilisateur' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await UserDetails.deleteUserDetails(id);
        res.json({ message: 'Détails de l\'utilisateur supprimés avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression des détails de l\'utilisateur' });
    }
});

export default router;
