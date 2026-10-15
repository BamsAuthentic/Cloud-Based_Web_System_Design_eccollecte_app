import { describe, it, expect } from 'vitest';
import { LANGS, LANG_NAMES } from './i18n';

describe('i18n', () => {
  describe('LANGS', () => {
    it('includes all three languages', () => {
      expect(LANGS).toContain('fr');
      expect(LANGS).toContain('en');
      expect(LANGS).toContain('sg');
    });
  });

  describe('LANG_NAMES', () => {
    it('has correct language names', () => {
      expect(LANG_NAMES.fr).toBe('Français');
      expect(LANG_NAMES.sg).toBe('Sängö');
      expect(LANG_NAMES.en).toBe('English');
    });
  });
});