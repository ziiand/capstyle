import db from '../config/db.js';

class Color {
    static async getAllColors() {
        const [rows] = await db.query('SELECT * FROM Colors');
        return rows;
    }

    static async getColorById(id) {
        const [rows] = await db.query('SELECT * FROM Colors WHERE id = ?', [id]);
        return rows[0];
    }

    static async createColor(name) {
        const [result] = await db.query('INSERT INTO Colors (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async updateColor(id, name) {
        await db.query('UPDATE Colors SET name = ? WHERE id = ?', [name, id]);
    }

    static async deleteColor(id) {
        await db.query('DELETE FROM Colors WHERE id = ?', [id]);
    }
}

export default Color;
