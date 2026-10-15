import mongoose from 'mongoose';

export const CATEGORIES = ['depot_sauvage', 'plastique', 'organique', 'encombrants', 'autre'];
export const STATUSES = ['signale', 'en_cours', 'resolu'];

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    category: { type: String, enum: CATEGORIES, default: 'depot_sauvage' },
    neighborhood: { type: String, required: true, trim: true, maxlength: 80 },
    image: { type: String, default: '' }, // URL /api/images/:id ou chemin de la photothèque
    status: { type: String, enum: STATUSES, default: 'signale', index: true },
  },
  { timestamps: true }
);

reportSchema.index({ createdAt: -1 });

export default mongoose.model('Report', reportSchema);
