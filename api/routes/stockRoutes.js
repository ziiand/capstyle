import express from 'express';
import Stocks from '../models/stockModel.js'; 
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stocks = await Stocks.getAllStocks();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des stocks' });
  }
});

router.post('/', async (req, res) => {
  const { capId, colorId, quantity } = req.body;
  try {
    const newStockId = await Stocks.addStock(capId, colorId, quantity);
    res.status(201).json({ id: newStockId, capId, colorId, quantity });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du stock' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { capId, colorId, quantity } = req.body;
  try {
    await Stocks.updateStock(id, capId, colorId, quantity);
    res.status(200).json({ message: 'Stock mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du stock' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Stocks.deleteStock(id);
    res.status(200).json({ message: 'Stock supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du stock' });
  }
});

export default router;
