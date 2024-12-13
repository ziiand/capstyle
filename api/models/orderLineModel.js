import db from "../config/db.js";

class OrderLine {
    static async getAllOrderLines() {
        try {
            const query = `
                SELECT 
                    ol.id AS order_id, 
                    u.firstname, 
                    u.lastname, 
                    os.status AS order_status, 
                    c.name AS cap_name, 
                    cl.name AS color_name, 
                    ol.quantity
                FROM 
                    order_line ol
                JOIN orders o ON ol.id_orders = o.id
                JOIN users u ON o.id_users = u.id
                JOIN order_status os ON o.id_status = os.id
                JOIN caps c ON ol.id_caps = c.id
                JOIN colors cl ON ol.id_colors = cl.id;
            `;
            const [rows] = await db.query(query);
            return rows;
        } catch (error) {
            console.error('Erreur lors de la récupération de toutes les lignes de commande:', error);
            throw error;
        }
    }

    static async getOrderLineById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM order_line WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Erreur lors de la récupération de la ligne de commande par ID:', error);
            throw error;
        }
    }

    static async createOrderLine(orderId, capId, colorId, quantity) {
        try {
            console.log('Données reçues pour la ligne de commande:', { orderId, capId, colorId, quantity });
            const isOrderValid = await this.isForeignKeyValid('orders', orderId);
            const isCapValid = await this.isForeignKeyValid('caps', capId);
            const isColorValid = await this.isForeignKeyValid('colors', colorId);
    
            if (!isOrderValid || !isCapValid || !isColorValid) {
                throw new Error('Clé étrangère invalide.');
            }
    
            const [result] = await db.query(
                'INSERT INTO order_line (id_orders, id_caps, id_colors, quantity) VALUES (?, ?, ?, ?)',
                [orderId, capId, colorId, quantity]
            );
            return result.insertId;
        } catch (error) {
            console.error('Erreur lors de la création de la ligne de commande:', error);
            throw error;
        }
    }

    static async updateOrderLine(id, orderId, capId, colorId, quantity) {
        try {
            await db.query(
                'UPDATE order_line SET id_orders = ?, id_caps = ?, id_colors = ?, quantity = ? WHERE id = ?',
                [orderId, capId, colorId, quantity, id]
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la ligne de commande:', error);
            throw error;
        }
    }

    static async deleteOrderLine(id) {
        try {
            const [result] = await db.query('DELETE FROM order_line WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Ligne de commande introuvable');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la ligne de commande:', error);
            throw error;
        }
    }

    static async isForeignKeyValid(table, id) {
        const allowedTables = ['orders', 'caps', 'colors'];
        if (!allowedTables.includes(table)) {
            throw new Error(`Table non autorisée: ${table}`);
        }
    
        try {
            const [rows] = await db.query(`SELECT id FROM ${table} WHERE id = ?`, [id]);
            return rows.length > 0;
        } catch (error) {
            console.error(`Erreur lors de la vérification de la clé étrangère dans ${table}:`, error);
            throw error;
        }
    }

    static async updateOrderStatus(orderId, statusId) {
        try {
            const [status] = await db.query('SELECT id FROM order_status WHERE id = ?', [statusId]);
            if (status.length === 0) {
                throw new Error('Statut invalide');
            }

            await db.query(
                'UPDATE orders SET id_status = ? WHERE id = ?',
                [statusId, orderId]
            );
        } catch (error) {
            console.error('Erreur lors de la mise à jour du statut de la commande:', error);
            throw error;
        }
    }
}

export default OrderLine;
