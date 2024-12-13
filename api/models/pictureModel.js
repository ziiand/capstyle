import db from '../config/db.js';

const Picture = {

  getImagesByStockId: async (id_stocks) => {
    try {
      const [rows] = await db.query(
        'SELECT name, alt FROM pictures WHERE id_stocks = ?',
        [id_stocks]
      );
      return rows;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des images');
    }
  }
};

export default Picture;
