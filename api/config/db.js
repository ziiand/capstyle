import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0, 
});
// Test de connexion
db.getConnection()
  .then((connection) => {
    console.log('Connecté à la base de données MySQL');
    connection.release();
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données:', err);
  });

export default db;


