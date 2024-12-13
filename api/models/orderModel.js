import db from "../config/db.js";

class Order {
    static async getAllOrders() {
        const query = `
          SELECT 
  o.id AS order_id,
  o.receipt_date,
  os.status AS order_status,
  u.firstname,
  u.lastname
FROM 
  orders o
JOIN 
  order_status os ON o.id_status = os.id
JOIN 
  users u ON o.id_users = u.id
ORDER BY 
  o.receipt_date DESC;

        `;
        try {
            console.log("Exécution de la requête...");
            const [rows] = await db.query(query);
            console.log("Données récupérées de la base de données:", rows);
            return rows;
        } catch (error) {
            console.error("Erreur lors de la récupération des commandes:", error);
            throw new Error("Erreur lors de la récupération des commandes");
        }
    }
    
    

    static async createOrder(userId, statusId, orderLines = []) {
      const connection = await db.getConnection(); 
      try {
          await connection.beginTransaction(); 
  
          if (!userId || !statusId) {
              throw new Error("userId et statusId sont requis");
          }
  
          const [user] = await connection.query(
              "SELECT * FROM users WHERE id = ?",
              [userId]
          );
          if (!user.length) { 
              throw new Error("L'utilisateur n'existe pas");
          }
  
          const [status] = await connection.query(
              "SELECT * FROM order_status WHERE id = ?",
              [statusId]
          );
          if (!status.length) { 
              throw new Error("Le statut n'existe pas");
          }
  
          const [result] = await connection.query(
              "INSERT INTO orders (id_users, id_status) VALUES (?, ?)",
              [userId, statusId]
          );
          const orderId = result.insertId;
  
          console.log("Commande créée avec succès. ID de la commande:", orderId);
  
          if (!Array.isArray(orderLines)) {
              throw new Error("orderLines doit être un tableau");
          }
  
          for (const line of orderLines) {
              const { id_caps, id_colors, quantity } = line;
  
             
              if (!id_caps || !id_colors || !quantity || quantity <= 0) {
                  throw new Error("id_caps, id_colors, et quantity sont requis et quantity doit être un nombre positif");
              }
  
              console.log(`Création de la ligne de commande: Caps ID ${id_caps}, Couleur ID ${id_colors}, Quantité ${quantity}`);
  
             
              const [insertResult] = await connection.query(
                  "INSERT INTO order_line (id_orders, id_caps, id_colors, quantity) VALUES (?, ?, ?, ?)",
                  [orderId, id_caps, id_colors, quantity]
              );
  
              console.log(`Ligne de commande ajoutée avec succès. ID de la ligne: ${insertResult.insertId}`);
          }
  
          await connection.commit(); 
          return orderId;
      } catch (error) {
          await connection.rollback(); 
          console.error("Erreur lors de la création de la commande:", error);
          throw new Error("Erreur lors de la création de la commande");
      } finally {
          connection.release();
      }
  }
  
  

    static async updateOrder(id, userId, statusId, orderLines = []) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction(); // Démarrer une transaction

            const [result] = await connection.query(
                "UPDATE orders SET id_users = ?, id_status = ? WHERE id = ?",
                [userId, statusId, id]
            );

            // Vérifie si la mise à jour a réussi
            if (result.affectedRows === 0) {
                throw new Error("Aucune commande trouvée avec cet ID");
            }

            console.log(`Commande ${id} mise à jour avec succès.`);

            // Assurer que orderLines est un tableau avant de l'itérer
            if (!Array.isArray(orderLines)) {
                throw new Error("orderLines doit être un tableau");
            }

            // Insérer ou mettre à jour les lignes de commande
            for (const line of orderLines) {
                const { id_caps, id_colors, quantity } = line;

                const [existingLine] = await connection.query(
                    "SELECT quantity FROM order_line WHERE id_orders = ? AND id_caps = ? AND id_colors = ?",
                    [id, id_caps, id_colors]
                );

                if (existingLine.length > 0) {
                    // Si la ligne existe, mettre à jour la quantité
                    await connection.query(
                        "UPDATE order_line SET quantity = ? WHERE id_orders = ? AND id_caps = ? AND id_colors = ?",
                        [quantity, id, id_caps, id_colors]
                    );
                } else {
                    // Sinon, insérer une nouvelle ligne
                    await connection.query(
                        "INSERT INTO order_line (id_orders, id_caps, id_colors, quantity) VALUES (?, ?, ?, ?)",
                        [id, id_caps, id_colors, quantity]
                    );
                }
            }

            await connection.commit(); // Valider la transaction
        } catch (error) {
            await connection.rollback(); // Annuler la transaction en cas d'erreur
            console.error("Erreur lors de la mise à jour de la commande:", error);
            throw new Error("Erreur lors de la mise à jour de la commande");
        } finally {
            connection.release(); // Libérer la connexion
        }
    }

    static async deleteOrder(id) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction(); // Commencer une transaction

            // Supprimer les lignes de commande associées
            await connection.query("DELETE FROM order_line WHERE id_orders = ?", [id]);

            // Supprimer la commande elle-même
            await connection.query("DELETE FROM orders WHERE id = ?", [id]);

            await connection.commit(); // Valider la transaction
        } catch (error) {
            await connection.rollback(); // Annuler la transaction en cas d'erreur
            console.error("Erreur lors de la suppression de la commande:", error);
            throw new Error("Erreur lors de la suppression de la commande");
        } finally {
            connection.release(); // Libérer la connexion
        }
    }
}

export default Order;
