import { Router } from 'express';
import { z } from 'zod';
import Post, { POST_CATEGORIES } from '../models/Post.js';
import { requireAdmin } from '../auth.js';
import { deleteImage, imageField, storeImage } from '../images.js';

const router = Router();

const createSchema = z.object({
  title: z.string().trim().min(5).max(160),
  category: z.enum(POST_CATEGORIES),
  excerpt: z.string().trim().min(10).max(400),
  content: z.string().trim().min(20).max(20000),
  image: imageField,
  breaking: z.boolean().default(false),
});

const ID = /^[a-z0-9-]{1,80}$/;

// « Journée de salubrité à Lakouanga » → journee-de-salubrite-a-lakouanga
function slugify(title) {
  return title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
}

// Liste, du plus récent au plus ancien
router.get('/', async (_req, res, next) => {
  try {
    res.json(await Post.find().sort({ createdAt: -1 }).limit(200));
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!ID.test(req.params.id)) return res.status(404).json({ error: 'not_found' });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'not_found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// Publication (agent de la Mairie)
router.post('/', requireAdmin, async (req, res, next) => {
  try {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: 'invalid_data', details: parsed.error.flatten().fieldErrors });
    }
    let id = slugify(parsed.data.title) || Date.now().toString(36);
    if (await Post.exists({ _id: id })) id = `${id}-${Date.now().toString(36)}`;
    const image = await storeImage(parsed.data.image);
    const post = await Post.create({ ...parsed.data, _id: id, image });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// Suppression (agent de la Mairie), avec la photo associée
router.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    if (!ID.test(req.params.id)) return res.status(404).json({ error: 'not_found' });
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'not_found' });
    await deleteImage(post.image);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;
