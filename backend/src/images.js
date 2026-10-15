import mongoose from 'mongoose';
import { z } from 'zod';
import Image from './models/Image.js';

const MAX_BYTES = 2 * 1024 * 1024; // le front-end réduit déjà les photos à ~100-300 Ko
const DATA_URL = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/;
const LIBRARY = /^\/images\/[a-z0-9-]+\.(?:jpe?g|png|webp)$/; // photothèque du site
const STORED = /^\/api\/images\/[a-f0-9]{24}$/; // photo déjà enregistrée

// Champ « image » accepté : vide, photo de la photothèque, photo déjà stockée, ou nouvelle photo
// en data URL. Tout le reste (liens externes, javascript:, etc.) est refusé.
export const imageField = z
  .string()
  .max(3 * 1024 * 1024)
  .refine((v) => v === '' || LIBRARY.test(v) || STORED.test(v) || DATA_URL.test(v), 'invalid_image')
  .default('');

// Enregistre une nouvelle photo et renvoie son URL ; laisse les autres valeurs inchangées.
export async function storeImage(value) {
  const m = DATA_URL.exec(value || '');
  if (!m) return value || '';
  const data = Buffer.from(m[2], 'base64');
  if (data.length > MAX_BYTES) {
    const err = new Error('image_too_large');
    err.status = 413;
    throw err;
  }
  const doc = await Image.create({ data, contentType: m[1] });
  return `/api/images/${doc._id}`;
}

export async function deleteImage(url) {
  const id = STORED.test(url || '') ? url.split('/').pop() : null;
  if (id && mongoose.isValidObjectId(id)) await Image.deleteOne({ _id: id });
}
