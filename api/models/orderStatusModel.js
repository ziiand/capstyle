import db from '../config/db.js';

class OrderStatus {
    static async getAllOrderStatuses() {
        const [rows] = await db.query('SELECT * FROM Order_status');
        return rows;
    }

    static async getOrderStatusById(id) {
        const [rows] = await db.query('SELECT * FROM Order_status WHERE id = ?', [id]);
        return rows[0];
    }

    static async createOrderStatus(status) {
        const [result] = await db.query('INSERT INTO Order_status (status) VALUES (?)', [status]);
        return result.insertId;
    }

    static async updateOrderStatus(id, status) {
        await db.query('UPDATE Order_status SET status = ? WHERE id = ?', [status, id]);
    }

    static async deleteOrderStatus(id) {
        await db.query('DELETE FROM Order_status WHERE id = ?', [id]);
    }
}

export default OrderStatus;
