import express from 'express';
import upload from '../config/formidable.js'; 
import db from '../config/db.js'; 

const router = express.Router();

router.post('/upload/:id_cap', (req, res) => {
  const { id_cap } = req.params;

  upload.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de l\'upload de l\'image', error: err.message });
    }

    const uploadedFile = files.image;

    if (!uploadedFile) {
      return res.status(400).json({ message: 'Aucun fichier téléchargé' });
    }

    const imageName = uploadedFile.newFilename; 
    const imagePath = `/uploads/images/${imageName}`; 

    try {
      const [result] = await db.query(
        'INSERT INTO pictures (id_stocks, name, alt) VALUES (?, ?, ?)',
        [id_cap, imageName, 'Texte alternatif par défaut']
      );

      res.status(200).json({ message: 'Image téléchargée avec succès', imagePath });
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'image dans la base de données:', error);
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'image', error: error.message });
    }
  });
});

export default router;
