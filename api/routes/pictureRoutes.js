import express from 'express';
import Picture from '../models/pictureModel.js'; 

const router = express.Router();

router.get('/:id_stocks', async (req, res) => {
  const { id_stocks } = req.params;

  try {
    const images = await Picture.getImagesByStockId(id_stocks);  

    if (images.length === 0) {
      return res.status(404).json({ message: 'Aucune image trouvée' });
    }

    const imagesWithPath = images.map(image => ({
      ...image,
      path: `/uploads/images/${image.name}`,  
    }));

    res.json(imagesWithPath);
  } catch (error) {
    console.error("Erreur : ", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
