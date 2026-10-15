import mongoose from 'mongoose';

export const SUBJECTS = ['signalement', 'suggestion', 'partenariat', 'presse', 'autre'];

// Message envoyé depuis la page Contact.
const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    phone: { type: String, trim: true, maxlength: 30, default: '' },
    subject: { type: String, enum: SUBJECTS, default: 'autre' },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
  },
  { timestamps: true }
);

messageSchema.index({ createdAt: -1 });

export default mongoose.model('Message', messageSchema);
