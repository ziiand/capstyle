import db from '../config/db.js';

class Country {
    static async getAllCountries() {
        const [rows] = await db.query('SELECT * FROM Country');
        return rows;
    }

    static async getCountryById(id) {
        const [rows] = await db.query('SELECT * FROM Country WHERE id = ?', [id]);
        return rows[0];
    }

    static async createCountry(name) {
        const [result] = await db.query('INSERT INTO Country (name) VALUES (?)', [name]);
        return result.insertId;
    }

    static async updateCountry(id, name) {
        await db.query('UPDATE Country SET name = ? WHERE id = ?', [name, id]);
    }

    static async deleteCountry(id) {
        await db.query('DELETE FROM Country WHERE id = ?', [id]);
    }
}

export default Country;
