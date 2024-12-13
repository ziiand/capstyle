import express from 'express';
import Order from '../models/orderModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        res.json(orders);
    } catch (error) {
        console.error("Erreur lors de la récupération des commandes:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.getOrderById(id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Commande non trouvée' });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la commande:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la commande' });
    }
});

router.post('/', async (req, res) => {
    const { userId, statusId, orderLines = [] } = req.body;

    if (!userId || !statusId) {
        return res.status(400).json({ message: 'Données manquantes ou invalides' });
    }

    try {
        const newOrderId = await Order.createOrder(userId, statusId, orderLines);
        res.status(201).json({ id: newOrderId, message: 'Commande créée avec succès' });
    } catch (error) {
        console.error("Erreur lors de la création de la commande:", error);
        res.status(500).json({ message: 'Erreur lors de la création de la commande', error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { userId, statusId, orderLines } = req.body;

    if (!userId || !statusId || !Array.isArray(orderLines) || orderLines.length === 0) {
        return res.status(400).json({ message: 'Données manquantes ou invalides' });
    }

    try {
        await Order.updateOrder(id, userId, statusId, orderLines);
        res.json({ message: 'Commande mise à jour avec succès' });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la commande:", error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Order.deleteOrder(id);
        res.json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
        console.error("Erreur lors de la suppression de la commande:", error);
        res.status(500).json({ message: 'Erreur lors de la suppression de la commande', error: error.message });
    }
});

export default router;
