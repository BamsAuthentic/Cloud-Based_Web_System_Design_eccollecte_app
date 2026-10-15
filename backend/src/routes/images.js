import { Router } from 'express';
import mongoose from 'mongoose';
import Image from '../models/Image.js';

const router = Router();

// Sert une photo stockée. Une photo ne change jamais : elle peut être mise en cache longtemps.
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({ error: 'not_found' });
    const image = await Image.findById(req.params.id).lean();
    if (!image) return res.status(404).json({ error: 'not_found' });
    res
      .set({
        'Content-Type': image.contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        // Le site peut être servi depuis une autre origine (ex. localhost:5173 en développement)
        'Cross-Origin-Resource-Policy': 'cross-origin',
      })
      .send(image.data.buffer ? Buffer.from(image.data.buffer) : image.data);
  } catch (err) {
    next(err);
  }
});

export default router;
