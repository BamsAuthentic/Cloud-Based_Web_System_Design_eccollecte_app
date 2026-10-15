import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import Message, { SUBJECTS } from '../models/Message.js';
import { requireAdmin } from '../auth.js';

const router = Router();

const createSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().default(''),
  subject: z.enum(SUBJECTS).default('autre'),
  message: z.string().trim().min(10).max(5000),
});

// Anti-spam : 5 messages par quart d'heure et par adresse IP
const sendLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: true, legacyHeaders: false });

router.post('/', sendLimit, async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'invalid_data', details: parsed.error.flatten().fieldErrors });
    }
    const message = await Message.create(parsed.data);
    res.status(201).json({ _id: message._id, createdAt: message.createdAt });
  } catch (err) {
    next(err);
  }
});

// Lecture des messages reçus (agent de la Mairie)
router.get('/', requireAdmin, async (_req, res, next) => {
  try {
    res.json(await Message.find().sort({ createdAt: -1 }).limit(500));
  } catch (err) {
    next(err);
  }
});

export default router;
