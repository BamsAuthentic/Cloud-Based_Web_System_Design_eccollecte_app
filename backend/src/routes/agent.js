import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireAdmin } from '../auth.js';

const router = Router();

// Anti force brute : 10 essais de clé par quart d'heure et par adresse IP
const verifyLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false });

// Vérifie la clé saisie dans l'« Espace agent » avant de l'accepter.
router.post('/verify', verifyLimit, requireAdmin, (_req, res) => res.status(204).end());

export default router;
