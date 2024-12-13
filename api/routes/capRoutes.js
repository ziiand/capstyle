import express from 'express';
import Cap from '../models/capModel.js';

const router = express.Router();



router.get('/trucker', async (req, res) => {
    try {
        const caps = await Cap.getCapsByType('Trucker'); 
        if (caps.length === 0) {
            return res.status(404).json({ message: 'Aucune casquette trouvée' });
        }
        res.json(caps);
    } catch (error) {
        console.error('Erreur lors de la récupération des casquettes:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des casquettes', error: error.message });
    }
});

router.get('/fitted', async (req, res) => {
    try {
        const caps = await Cap.getCapsByType('Fitted'); 
        if (caps.length === 0) {
            return res.status(404).json({ message: 'Aucune casquette trouvée' });
        }
        res.json(caps);
    } catch (error) {
        console.error('Erreur lors de la récupération des casquettes:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des casquettes', error: error.message });
    }
});

router.get('/snapback', async (req, res) => {
    try {
        const caps = await Cap.getCapsByType('Snapback');
        if (caps.length === 0) {
            return res.status(404).json({ message: 'Aucune casquette trouvée' });
        }
        res.json(caps);
    } catch (error) {
        console.error('Erreur lors de la récupération des casquettes:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des casquettes', error: error.message });
    }
});




router.get('/', async (req, res) => {
    console.log('Requête pour récupérer tous les caps');
    try {
        const caps = await Cap.getAllCaps();
        console.log('Caps récupérés:', caps);
        res.json(caps);
    } catch (error) {
        console.error('Erreur lors de la récupération des caps:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des caps' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const cap = await Cap.getCapById(id);
        if (cap) {
            res.json(cap);
        } else {
            res.status(404).json({ message: 'Cap non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du cap' });
    }
});

router.post('/', async (req, res) => {
    const { name, description, price } = req.body;
    try {
        const newCapId = await Cap.createCap(name, description, price);
        res.status(201).json({ id: newCapId, message: 'Cap créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du cap' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        await Cap.updateCap(id, name, description, price);
        res.json({ message: 'Cap mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du cap' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Cap.deleteCap(id);
        res.json({ message: 'Cap supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du cap' });
    }
});

export default router;
