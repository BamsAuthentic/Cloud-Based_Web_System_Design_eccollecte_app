import mongoose from 'mongoose';

export const POST_CATEGORIES = ['flash', 'annonce', 'sensibilisation', 'conseil', 'evenement'];

// Article de la rubrique « Sensibilisation & actualités ».
// L'identifiant est un slug lisible (ex. saison-des-pluies-caniveaux), utilisé dans l'URL du site.
const postSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true, trim: true, maxlength: 160 },
    category: { type: String, enum: POST_CATEGORIES, required: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 400 },
    content: { type: String, required: true, trim: true, maxlength: 20000 },
    image: { type: String, default: '' },
    breaking: { type: Boolean, default: false },
    demo: { type: Boolean, default: false },
    author: { type: String, default: 'Mairie de Bangui', maxlength: 80 },
  },
  { timestamps: true }
);

postSchema.index({ createdAt: -1 });

export default mongoose.model('Post', postSchema);
