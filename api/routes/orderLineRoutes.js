import express from 'express';
import OrderLine from '../models/orderLineModel.js';
import db from '../config/db.js';


const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const orderLines = await OrderLine.getAllOrderLines();
        res.json(orderLines);
    } catch (error) {
        console.error("Erreur lors de la récupération des lignes de commande:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération des lignes de commande', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const orderLine = await OrderLine.getOrderLineById(id);
        if (orderLine) {
            res.json(orderLine);
        } else {
            res.status(404).json({ message: 'Ligne de commande non trouvée' });
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de la ligne de commande:", error);
        res.status(500).json({ message: 'Erreur lors de la récupération de la ligne de commande', error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { orderId, capId, colorId, quantity } = req.body;

    if (!orderId || !capId || !colorId || !quantity) {
        return res.status(400).json({ message: 'Tous les champs sont requis: orderId, capId, colorId, quantity' });
    }

    try {
        const [orderExists] = await db.query('SELECT id FROM orders WHERE id = ?', [orderId]);
        const [capExists] = await db.query('SELECT id FROM caps WHERE id = ?', [capId]);
        const [colorExists] = await db.query('SELECT id FROM colors WHERE id = ?', [colorId]);

        if (!orderExists) {
            return res.status(400).json({ message: `Commande avec id ${orderId} introuvable` });
        }
        if (!capExists) {
            return res.status(400).json({ message: `Casquette avec id ${capId} introuvable` });
        }
        if (!colorExists) {
            return res.status(400).json({ message: `Couleur avec id ${colorId} introuvable` });
        }

        const newOrderLineId = await OrderLine.createOrderLine(orderId, capId, colorId, quantity);
        res.status(201).json({ id: newOrderLineId, message: 'Ligne de commande créée avec succès' });
    } catch (error) {
        console.error("Erreur lors de la création de la ligne de commande:", error);
        res.status(500).json({ message: 'Erreur lors de la création de la ligne de commande', error: error.message });
    }
});

router.post('/orderLines', async (req, res) => {
    const { orderId, capId, colorId, quantity } = req.body;
  
    const query = `
      INSERT INTO order_line (order_id, cap_id, color_id, quantity)
      VALUES (?, ?, ?, ?)
    `;
    
    try {
      await pool.query(query, [orderId, capId, colorId, quantity]);
      res.status(201).json({ message: 'Ligne de commande ajoutée avec succès.' });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la ligne de commande:', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de la ligne de commande.' });
    }
  });

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { orderId, capId, colorId, quantity } = req.body;

    if (!orderId || !capId || !colorId || !quantity) {
        return res.status(400).json({ message: 'Tous les champs sont requis: orderId, capId, colorId, quantity' });
    }

    try {
        await OrderLine.updateOrderLine(id, orderId, capId,colorId, quantity);
        res.json({ message: 'Ligne de commande mise à jour avec succès' });
    } catch (error) {
        console.error("Erreur lors de la mise à jour de la ligne de commande:", error);
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la ligne de commande', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        await OrderLine.deleteOrderLine(id);  
        res.json({ message: 'Ligne de commande supprimée avec succès' });  
    } catch (error) {
        console.error("Erreur lors de la suppression de la ligne de commande:", error);  
        res.status(500).json({ message: 'Erreur lors de la suppression de la ligne de commande', error: error.message });
    }
});


export default router;
