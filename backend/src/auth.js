import crypto from 'node:crypto';

// Comparaison à temps constant de la clé agent.
export function validKey(provided) {
  const expected = process.env.ADMIN_KEY;
  if (!expected || typeof provided !== 'string') return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function requireAdmin(req, res, next) {
  if (!validKey(req.header('x-admin-key'))) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}
