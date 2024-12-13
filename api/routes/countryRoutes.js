import express from 'express';
import Country from '../models/countryModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const countries = await Country.getAllCountries();
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des pays' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const country = await Country.getCountryById(id);
        if (country) {
            res.json(country);
        } else {
            res.status(404).json({ message: 'Pays non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du pays' });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newCountryId = await Country.createCountry(name);
        res.status(201).json({ id: newCountryId, message: 'Pays créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du pays' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        await Country.updateCountry(id, name);
        res.json({ message: 'Pays mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du pays' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Country.deleteCountry(id);
        res.json({ message: 'Pays supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du pays' });
    }
});

export default router;
