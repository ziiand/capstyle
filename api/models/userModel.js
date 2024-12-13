import db from "../config/db.js"; 

class User {
  
  static async create(userData) {
    try {
      const { email, password, firstname, lastname, id_roles } = userData;

      if (!email || !password || !firstname || !lastname || !id_roles) {
        throw new Error(
          "Les paramètres de la requête ne peuvent pas être undefined"
        );
      }

      const [result] = await db.query(
        "INSERT INTO users (email, password, firstname, lastname, id_roles) VALUES (?, ?, ?, ?, ?)",
        [email, hashedPassword, firstname, lastname, id_roles]
      );

      return result;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error; 
    }
  }


  static async findByEmail(email) {
    try {
      if (!email) {
        throw new Error("L'email ne peut pas être undefined");
      }

      const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
      console.error(
        "Erreur lors de la recherche de l'utilisateur par email:",
        error
      );
      throw error; 
    }
  }

 
  static async findById(userId) {
    try {
      const [rows] = await db.execute(
        'SELECT id, email, firstname, lastname, id_roles FROM users WHERE id = ?',
        [userId]
      );

      return rows.length > 0 ? rows[0] : null; 
    } catch (error) {
      console.error("Erreur lors de la recherche de l'utilisateur par ID:", error);
      throw error;
    }
  }


  
  static async update(userId, updateData) {
    try {
      const { email, firstname, lastname } = updateData;

     
      const fields = [];
      const values = [];

      if (email) {
        fields.push("email = ?");
        values.push(email);
      }
      if (firstname) {
        fields.push("firstname = ?");
        values.push(firstname);
      }
      if (lastname) {
        fields.push("lastname = ?");
        values.push(lastname);
      }

      if (fields.length === 0) {
        throw new Error("Aucune donnée à mettre à jour");
      }

      const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
      values.push(userId);

      const [result] = await db.execute(query, values); 
      return result; 
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      throw error; 
    }
  }

  
  static async hasRole(userId, roleId) {
    try {
      const [rows] = await db.execute(
        "SELECT * FROM users WHERE id = ? AND id_roles = ?",
        [userId, roleId]
      );

      return rows.length > 0; 
    } catch (error) {
      console.error(
        "Erreur lors de la vérification du rôle de l'utilisateur:",
        error
      );
      throw error; 
    }
  }
}

export default User;
