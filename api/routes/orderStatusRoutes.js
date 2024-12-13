import express from 'express';
import OrderStatus from '../models/orderStatusModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orderStatuses = await OrderStatus.getAllOrderStatuses();
        res.json(orderStatuses);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des statuts de commande' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const orderStatus = await OrderStatus.getOrderStatusById(id);
        if (orderStatus) {
            res.json(orderStatus);
        } else {
            res.status(404).json({ message: 'Statut de commande non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du statut de commande' });
    }
});

router.post('/', async (req, res) => {
    const { status } = req.body;
    try {
        const newOrderStatusId = await OrderStatus.createOrderStatus(status);
        res.status(201).json({ id: newOrderStatusId, message: 'Statut de commande créé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création du statut de commande' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await OrderStatus.updateOrderStatus(id, status);
        res.json({ message: 'Statut de commande mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de commande' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await OrderStatus.deleteOrderStatus(id);
        res.json({ message: 'Statut de commande supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du statut de commande' });
    }
});

export default router;
