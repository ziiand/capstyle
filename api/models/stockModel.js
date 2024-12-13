import db from '../config/db.js';
class Stocks {

  static async getAllStocks() {
    const [rows] = await db.query('SELECT * FROM stocks');
    return rows;
  }


  static async getStockById(id) {
    const [rows] = await db.query('SELECT * FROM stocks WHERE id = ?', [id]);
    return rows[0];
  }


  static async addStock(capId, colorId, quantity) {
    const [result] = await db.query(
      'INSERT INTO stocks (id_caps, id_colors, quantity) VALUES (?, ?, ?)',
      [capId, colorId, quantity]
    );
    return result.insertId;
  }


  static async updateStock(id, capId, colorId, quantity) {
    await db.query(
      'UPDATE stocks SET id_caps = ?, id_colors = ?, quantity = ? WHERE id = ?',
      [capId, colorId, quantity, id]
    );
  }

  
  static async deleteStock(id) {
    await db.query('DELETE FROM stocks WHERE id = ?', [id]);
  }
}

export default Stocks;
