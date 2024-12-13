import db from '../config/db.js';

class Role {
    static async getAllRoles() {
        const [rows] = await db.query('SELECT * FROM Roles');
        return rows;
    }

    static async getRoleById(id) {
        const [rows] = await db.query('SELECT * FROM Roles WHERE id = ?', [id]);
        return rows[0];
    }

    static async createRole(role) {
        const [result] = await db.query('INSERT INTO Roles (role) VALUES (?)', [role]);
        return result.insertId;
    }

    static async updateRole(id, role) {
        await db.query('UPDATE Roles SET role = ? WHERE id = ?', [role, id]);
    }

    static async deleteRole(id) {
        await db.query('DELETE FROM Roles WHERE id = ?', [id]);
    }
}

export default Role;
