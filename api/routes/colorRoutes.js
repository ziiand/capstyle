import express from 'express';
import Color from '../models/colorModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const colors = await Color.getAllColors();
        res.json(colors);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des couleurs' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const color = await Color.getColorById(id);
        if (color) {
            res.json(color);
        } else {
            res.status(404).json({ message: 'Couleur non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la couleur' });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newColorId = await Color.createColor(name);
        res.status(201).json({ id: newColorId, message: 'Couleur créée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la couleur' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Color.updateColor(id, name);
        res.json({ message: 'Couleur mise à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la couleur' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Color.deleteColor(id);
        res.json({ message: 'Couleur supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la couleur' });
    }
});

export default router;
