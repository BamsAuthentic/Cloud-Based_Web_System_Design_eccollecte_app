import { useI18n } from '../i18n.jsx';
import { href } from '../router.js';
import Icon from './Icon.jsx';

// Bandeau défilant « Flash info » alimenté par les articles marqués comme urgents.
export default function Ticker({ posts }) {
  const { t } = useI18n();
  const items = posts.filter((p) => p.breaking);
  if (items.length === 0) return null;

  // Contenu doublé pour une boucle continue.
  const loop = [...items, ...items];

  return (
    <div className="ticker" role="region" aria-label={t('ticker.label')}>
      <span className="ticker-label">
        <Icon name="bolt" size={15} />
        {t('ticker.label')}
      </span>
      <div className="ticker-track-wrap">
        <ul className="ticker-track" style={{ '--items': items.length }}>
          {loop.map((p, i) => (
            <li key={`${p._id}-${i}`} aria-hidden={i >= items.length || undefined}>
              <a href={href.article(p._id)} tabIndex={i >= items.length ? -1 : undefined}>
                {p.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
