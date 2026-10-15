import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import reportsRouter from './routes/reports.js';
import postsRouter from './routes/posts.js';
import contactRouter from './routes/contact.js';
import imagesRouter from './routes/images.js';
import agentRouter from './routes/agent.js';

const app = express();

// Render et Vercel placent l'application derrière un proxy.
app.set('trust proxy', 1);

// CLIENT_URL accepte plusieurs origines séparées par des virgules.
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Pas d'en-tête Origin (curl, tests) ou origine autorisée.
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(null, false);
    },
  })
);
// Corps JSON : 3 Mo pour les envois avec photo, 10 Ko partout ailleurs.
// Le premier analyseur qui s'applique gagne ; les suivants ignorent un corps déjà lu.
const withPhoto = express.json({ limit: '3mb' });
app.post('/api/reports', withPhoto);
app.post('/api/posts', withPhoto);
app.use(express.json({ limit: '10kb' }));
app.use(
  '/api',
  rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false })
);

app.get('/health', (_req, res) => res.json({ status: 'ok', uptime: process.uptime() }));
app.use('/api/reports', reportsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/images', imagesRouter);
app.use('/api/agent', agentRouter);

app.use((_req, res) => res.status(404).json({ error: 'not_found' }));

// JSON mal formé, erreurs inattendues : réponse générique, sans détails internes.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'invalid_json' });
  if (err.type === 'entity.too.large' || err.status === 413) return res.status(413).json({ error: 'too_large' });
  console.error(err);
  res.status(500).json({ error: 'server_error' });
});

export default app;
