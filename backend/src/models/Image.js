import mongoose from 'mongoose';

// Photo envoyée par un citoyen ou un agent, stockée en binaire.
// Les documents de signalement et d'article ne gardent que l'URL /api/images/:id,
// pour que les listes restent légères.
const imageSchema = new mongoose.Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true, enum: ['image/jpeg', 'image/png', 'image/webp'] },
  },
  { timestamps: true }
);

export default mongoose.model('Image', imageSchema);
