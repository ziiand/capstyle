import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
  const { email, password, firstname, lastname } = req.body;

  if (!email || !password || !firstname || !lastname) {
    return res.status(400).json({ message: 'Email, password, firstname, and lastname are required' });
  }

  try {
    console.log("Données reçues pour l'inscription:", { email, firstname, lastname });

    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Mot de passe haché:", hashedPassword);

    const result = await db.query('INSERT INTO users (email, password, firstname, lastname, id_roles) VALUES (?, ?, ?, ?, ?)', 
      [email, hashedPassword, firstname, lastname, 2]);

    console.log("Résultat de l'insertion:", result);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(`
      SELECT users.*, roles.name AS role 
      FROM users 
      JOIN roles ON users.id_roles = roles.id
      WHERE email = ?`, [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    req.session.userId = user.id; 
    console.log("Session userId après connexion :", req.session.userId);
    console.log("Rôle de l'utilisateur après connexion:", user.id_roles);
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save session' });
      }

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          firstname: user.firstname,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Supprime le cookie de session
    res.json({ message: 'Logout successful' });
  });
};
