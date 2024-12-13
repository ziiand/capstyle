import express from 'express';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import formidable from 'formidable';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './config/db.js';
import dashboardsRoutes from './routes/dashboardRoutes.js';
import capRoutes from './routes/capRoutes.js';
import roleRoutes from './routes/roleRoutes.js'; 
import userDetailsRoutes from './routes/userDetailsRoutes.js'; 
import pictureRoutes from './routes/pictureRoutes.js'; 
import stockRoutes from './routes/stockRoutes.js'; 
import orderRoutes from './routes/orderRoutes.js';
import orderLineRoutes from './routes/orderLineRoutes.js';
import orderStatusRoutes from './routes/orderStatusRoutes.js';
import path from 'path';  
import { fileURLToPath } from 'url';  

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173'
}));

const MySQLSessionStore = MySQLStore(session);
const sessionStore = new MySQLSessionStore({}, db);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false }, 
  })
);

app.post('/api/upload', (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, 'public', 'images'),
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur lors de l'upload" });
    }

    const product_id = fields.product_id;
    const imagePath = `/images/${path.basename(files.image.filepath)}`;

    try {
      await db.query(
        'INSERT INTO pictures (product_id, path) VALUES (?, ?)',
        [product_id, imagePath]
      );
      res.status(201).json({ message: 'Image uploadée avec succès', path: imagePath });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de l'enregistrement en base de données" });
    }
  });
});

app.use('/api/users', userRoutes);
app.use('/api', dashboardsRoutes);
app.use('/api/caps', capRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/userDetails', userDetailsRoutes);
app.use('/api/pictures', pictureRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/orderLines', orderLineRoutes);
app.use('/api/orderStatus', orderStatusRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur est survenue', error: err.message }); 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
