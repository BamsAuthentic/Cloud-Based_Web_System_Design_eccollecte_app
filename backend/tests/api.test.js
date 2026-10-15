import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('API EcoCollecte', () => {
  it('GET /health répond ok / responds ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('POST /api/reports refuse des données invalides / rejects invalid data', async () => {
    const res = await request(app).post('/api/reports').send({ title: 'a' });
    expect(res.status).toBe(400);
  });

  it('PATCH statut sans clé est refusé / status change without key is rejected', async () => {
    const res = await request(app)
      .patch('/api/reports/507f1f77bcf86cd799439011/status')
      .send({ status: 'resolu' });
    expect(res.status).toBe(401);
  });

  it('POST /api/reports refuse une image externe / rejects an external image URL', async () => {
    const res = await request(app).post('/api/reports').send({
      title: 'Dépôt sauvage',
      description: 'Ordures devant le marché',
      neighborhood: 'Sica',
      image: 'https://exemple.com/piege.jpg',
    });
    expect(res.status).toBe(400);
    expect(res.body.details.image).toBeDefined();
  });

  it('POST /api/posts sans clé est refusé / publishing without key is rejected', async () => {
    const res = await request(app).post('/api/posts').send({ title: 'Article' });
    expect(res.status).toBe(401);
  });

  it('DELETE /api/posts/:id sans clé est refusé / deleting without key is rejected', async () => {
    const res = await request(app).delete('/api/posts/un-article');
    expect(res.status).toBe(401);
  });

  it('POST /api/posts avec clé mais données invalides → 400', async () => {
    process.env.ADMIN_KEY = 'cle-de-test';
    const res = await request(app)
      .post('/api/posts')
      .set('x-admin-key', 'cle-de-test')
      .send({ title: 'Court', category: 'inconnue' });
    expect(res.status).toBe(400);
  });

  it('POST /api/agent/verify : mauvaise clé 401, bonne clé 204', async () => {
    process.env.ADMIN_KEY = 'cle-de-test';
    expect((await request(app).post('/api/agent/verify').set('x-admin-key', 'faux')).status).toBe(401);
    expect((await request(app).post('/api/agent/verify').set('x-admin-key', 'cle-de-test')).status).toBe(204);
  });

  it('POST /api/contact refuse un e-mail invalide / rejects an invalid email', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'Test', email: 'pas-un-email', message: 'Bonjour la Mairie de Bangui' });
    expect(res.status).toBe(400);
    expect(res.body.details.email).toBeDefined();
  });

  it('GET /api/contact sans clé est refusé / reading messages without key is rejected', async () => {
    expect((await request(app).get('/api/contact')).status).toBe(401);
  });

  it('corps trop volumineux → 413 / oversized body returns 413', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({ name: 'x', email: 'a@b.cf', message: 'x'.repeat(20000) });
    expect(res.status).toBe(413);
  });

  it('identifiant de photo invalide → 404', async () => {
    expect((await request(app).get('/api/images/pas-un-id')).status).toBe(404);
  });

  it('route inconnue renvoie 404 / unknown route returns 404', async () => {
    const res = await request(app).get('/nimporte-quoi');
    expect(res.status).toBe(404);
  });
});
