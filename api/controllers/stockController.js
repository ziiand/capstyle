import db from '../config/db.js';

export const getAllStocks = async (req, res) => {
  try {
      const [stocks] = await db.query('SELECT * FROM Stocks');
      res.status(200).json(stocks);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de la récupération des stocks' });
  }
};

export const getStockById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM stocks WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Stock not found' });
    res.status(200).json(results[0]);
  });
};

export const createStock = (req, res) => {
  const newStock = req.body;
  db.query('INSERT INTO stocks SET ?', newStock, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: results.insertId, ...newStock });
  });
};

export const updateStock = (req, res) => {
  const { id } = req.params;
  const updatedStock = req.body;
  db.query('UPDATE stocks SET ? WHERE id = ?', [updatedStock, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ id, ...updatedStock });
  });
};

export const deleteStock = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM stocks WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
