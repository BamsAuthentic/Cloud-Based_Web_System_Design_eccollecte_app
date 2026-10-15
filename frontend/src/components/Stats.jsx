import { useI18n } from '../i18n.jsx';
import Icon from './Icon.jsx';

export default function Stats({ stats }) {
  const { t } = useI18n();
  const total = stats.total ?? 0;
  const pct = (n) => (total ? Math.round(((n ?? 0) / total) * 100) : 0);

  const items = [
    { cls: 'total', icon: 'layers', label: t('stats.total'), value: total, note: t('stats.rate', { n: pct(stats.resolu) }) },
    { cls: 'signale', icon: 'alert', label: t('status.signale'), value: stats.signale, share: pct(stats.signale) },
    { cls: 'en_cours', icon: 'clock', label: t('status.en_cours'), value: stats.en_cours, share: pct(stats.en_cours) },
    { cls: 'resolu', icon: 'check', label: t('status.resolu'), value: stats.resolu, share: pct(stats.resolu) },
  ];

  return (
    <section className="stats" aria-label={t('stats.label')}>
      {items.map((i) => (
        <div key={i.cls} className={`stat ${i.cls}`}>
          <span className="stat-icon">
            <Icon name={i.icon} size={18} />
          </span>
          <div className="stat-body">
            <strong>{i.value ?? 0}</strong>
            <span>{i.label}</span>
          </div>
          {i.note ? (
            <small className="stat-note">{i.note}</small>
          ) : (
            <div className="meter" aria-hidden="true">
              <span style={{ width: `${i.share}%` }} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
