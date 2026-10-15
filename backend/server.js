import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app.js';

const PORT = process.env.PORT || 5000;

async function start() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI manquant / missing (voir .env)');
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB connecté / connected');
  app.listen(PORT, () => console.log(`API EcoCollecte : http://localhost:${PORT}`));
}

start().catch((err) => {
  console.error('Échec du démarrage / startup failed :', err.message);
  process.exit(1);
});
