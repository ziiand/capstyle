import db from '../config/db.js';

class UserDetails {
    static async getAllUserDetails() {
        const [rows] = await db.query('SELECT * FROM Users_details');
        return rows;
    }

    static async getUserDetailsById(id) {
        const [rows] = await db.query('SELECT * FROM Users_details WHERE id = ?', [id]);
        return rows[0];
    }

    static async createUserDetails(userId, firstName, lastName, address) {
        const [result] = await db.query('INSERT INTO Users_details (user_id, first_name, last_name, address) VALUES (?, ?, ?, ?)', [userId, firstName, lastName, address]);
        return result.insertId;
    }

    static async updateUserDetails(id, firstName, lastName, address) {
        await db.query('UPDATE Users_details SET first_name = ?, last_name = ?, address = ? WHERE id = ?', [firstName, lastName, address, id]);
    }

    static async deleteUserDetails(id) {
        await db.query('DELETE FROM Users_details WHERE id = ?', [id]);
    }
}

export default UserDetails;
