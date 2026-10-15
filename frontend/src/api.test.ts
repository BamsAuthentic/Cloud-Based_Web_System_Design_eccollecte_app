import { describe, it, expect, vi } from 'vitest';
import { getReports, getStats, isMock, createReport, updateStatus } from './api';

describe('api - mode démo', () => {
  beforeEach(() => {
    process.env.VITE_API_URL = '';
    localStorage.clear();
  });

  describe('getReports', () => {
    it('returns all reports from mock', async () => {
      const reports = await getReports();
      expect(isMock).toBe(true);
      expect(Array.isArray(reports)).toBe(true);
      expect(reports.length).toBe(4);
    });

    it('returns filtered reports by status', async () => {
      const reports = await getReports('signale');
      expect(isMock).toBe(true);
      expect(Array.isArray(reports)).toBe(true);
      // seed-1 and seed-3 have status 'signale'
      const signaleCount = reports.filter((r) => r.status === 'signale').length;
      expect(signaleCount).toBe(2);
    });
  });

  describe('getStats', () => {
    it('returns stats from mock', async () => {
      const stats = await getStats();
      expect(isMock).toBe(true);
      expect(stats).toHaveProperty('total');
      expect(stats.total).toBe(4);
    });
  });

  describe('createReport', () => {
    it('creates report with valid data', async () => {
      const result = await createReport({
        title: 'Test report',
        description: 'Test description',
        neighborhood: 'Test quartier',
        category: 'depot_sauvage',
      });
      expect(result).toHaveProperty('title', 'Test report');
      expect(result).toHaveProperty('status', 'signale');
    });

    it('throws for invalid title (< 3 chars)', async () => {
      await expect(
        createReport({ title: 'Ab', description: 'Test description', neighborhood: 'Test' })
      ).rejects.toThrow('HTTP 400');
    });

    it('throws for invalid description (< 5 chars)', async () => {
      await expect(
        createReport({ title: 'Test report', description: 'Ab', neighborhood: 'Test' })
      ).rejects.toThrow('HTTP 400');
    });

    it('throws for invalid neighborhood (< 2 chars)', async () => {
      await expect(
        createReport({ title: 'Test report', description: 'Test ab', neighborhood: 'A' })
      ).rejects.toThrow('HTTP 400');
    });
  });

  describe('updateStatus', () => {
    it('updates status with demo key', async () => {
      const result = await updateStatus('seed-1', 'resolu', 'demo');
      expect(result).toHaveProperty('status', 'resolu');
    });

    it('throws for invalid admin key', async () => {
      await expect(
        updateStatus('seed-1', 'resolu', 'wrong-key')
      ).rejects.toThrow('HTTP 401');
    });

    it('throws for invalid status', async () => {
      await expect(
        updateStatus('seed-1', 'invalid-status', 'demo')
      ).rejects.toThrow('HTTP 400');
    });
  });
});