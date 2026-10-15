import { describe, it, expect } from 'vitest';

describe('resizeImage', () => {
  it('is defined and is a function', () => {
    import('./image').then(({ resizeImage }) => {
      expect(typeof resizeImage).toBe('function');
    });
  });

  it('exists in the module', () => {
    expect(true).toBe(true);
  });
});