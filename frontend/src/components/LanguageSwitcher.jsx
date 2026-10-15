import { LANGS, LANG_NAMES, useI18n } from '../i18n.jsx';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="segmented lang" role="group" aria-label={t('lang.label')}>
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={LANG_NAMES[code]}
          aria-label={LANG_NAMES[code]}
          className={lang === code ? 'active' : ''}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
