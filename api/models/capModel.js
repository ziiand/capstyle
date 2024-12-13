import db from '../config/db.js';

class Cap {

    static async getCapsByType(name) {
        try {
            const [rows] = await db.query(`
                SELECT c.id AS cap_id, c.name AS cap_name, c.description, c.price, 
                       p.name AS picture_name, p.alt AS picture_alt, co.name AS color_name 
                FROM Caps c
                JOIN Stocks s ON c.id = s.id_caps
                JOIN Colors co ON s.id_colors = co.id
                JOIN Pictures p ON s.id = p.id_stocks
                WHERE c.name LIKE ?`, [`%${name}%`]);
    
            return rows;
        } catch (error) {
            console.error('Erreur lors de la récupération des casquettes:', error);
            throw new Error('Erreur lors de la récupération des casquettes');
        }
    }

    static async getAllCaps() {
        const [rows] = await db.query('SELECT * FROM Caps');
        return rows;
    }

    static async getCapById(id) {
        const [rows] = await db.query('SELECT * FROM Caps WHERE id = ?', [id]);
        return rows[0];
    }

    static async createCap(name, description, price) {
        const [result] = await db.query('INSERT INTO Caps (name, description, price) VALUES (?, ?, ?)', [name, description, price]);
        return result.insertId;
    }

    static async updateCap(id, name, description, price) {
        await db.query('UPDATE Caps SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
    }

    static async deleteCap(id) {
        await db.query('DELETE FROM Caps WHERE id = ?', [id]);
    }
}

export default Cap;
