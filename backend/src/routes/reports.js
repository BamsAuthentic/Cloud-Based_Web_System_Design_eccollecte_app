import { Router } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import Report, { CATEGORIES, STATUSES } from '../models/Report.js';
import { requireAdmin } from '../auth.js';
import { imageField, storeImage } from '../images.js';

const router = Router();

const createSchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(5).max(1000),
  category: z.enum(CATEGORIES).default('depot_sauvage'),
  neighborhood: z.string().trim().min(2).max(80),
  image: imageField,
});

const statusSchema = z.object({ status: z.enum(STATUSES) });

// Liste (filtre optionnel ?status=)
router.get('/', async (req, res, next) => {
  try {
    const filter = STATUSES.includes(req.query.status) ? { status: req.query.status } : {};
    const reports = await Report.find(filter).sort({ createdAt: -1 }).limit(200);
    res.json(reports);
  } catch (err) {
    next(err);
  }
});

// Statistiques (déclarée avant /:id)
router.get('/stats', async (_req, res, next) => {
  try {
    const rows = await Report.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
    const stats = { signale: 0, en_cours: 0, resolu: 0, total: 0 };
    for (const r of rows) {
      if (r._id in stats) stats[r._id] = r.count;
      stats.total += r.count;
    }
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// Création
router.post('/', async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ error: 'invalid_data', details: parsed.error.flatten().fieldErrors });
    }
    const image = await storeImage(parsed.data.image);
    const report = await Report.create({ ...parsed.data, image });
    res.status(201).json(report);
  } catch (err) {
    next(err);
  }
});

// Changement de statut (agent de collecte)
router.patch('/:id/status', requireAdmin, async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'invalid_id' });
    }
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: 'invalid_status' });

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status: parsed.data.status },
      { new: true }
    );
    if (!report) return res.status(404).json({ error: 'not_found' });
    res.json(report);
  } catch (err) {
    next(err);
  }
});

export default router;
