import { useState } from 'react';
import { POST_CATEGORIES } from '../api.js';
import { useI18n } from '../i18n.jsx';
import Icon, { POST_ICONS } from './Icon.jsx';
import NewsCard from './NewsCard.jsx';

export default function BlogPage({ posts, loading, adminKey, onPublish }) {
  const { t } = useI18n();
  const [cat, setCat] = useState('');
  const shown = cat ? posts.filter((p) => p.category === cat) : posts;
  const [first, ...rest] = shown;

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="kicker kicker-light">{t('news.eyebrow')}</span>
          <h1>{t('news.title')}</h1>
          <p className="lead">{t('news.lead')}</p>
          {adminKey && (
            <button type="button" className="btn btn-light" onClick={onPublish}>
              <Icon name="plus" size={18} /> {t('news.publish')}
            </button>
          )}
        </div>
      </section>

      <main className="shell page">
        <div className="filters cat-filters" role="group" aria-label={t('editor.category')}>
          {['', ...POST_CATEGORIES].map((c) => (
            <button
              key={c || 'all'}
              type="button"
              className={`filter ${cat === c ? 'active' : ''}`}
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
            >
              {c && <Icon name={POST_ICONS[c]} size={15} />}
              {c ? t(`postcat.${c}`) : t('news.allCats')}
              <span className="filter-count">{c ? posts.filter((p) => p.category === c).length : posts.length}</span>
            </button>
          ))}
        </div>

        {loading && posts.length === 0 ? (
          <div className="news-grid">
            {[0, 1, 2].map((i) => (
              <div key={i} className="news-card skeleton">
                <span className="sk sk-cover" />
                <div className="news-body sk-lines">
                  <span className="sk sk-title" />
                  <span className="sk" />
                  <span className="sk sk-short" />
                </div>
              </div>
            ))}
          </div>
        ) : !first ? (
          <div className="empty">
            <Icon name="newspaper" size={40} />
            <p>{t('news.empty')}</p>
          </div>
        ) : (
          <>
            <NewsCard post={first} featured />
            {rest.length > 0 && (
              // 2 colonnes quand 3 laisserait une carte orpheline (2 ou 4 articles)
              <div className={`news-grid ${rest.length % 3 !== 0 && rest.length % 2 === 0 ? 'news-grid-2' : ''}`}>
                {rest.map((p) => (
                  <NewsCard key={p._id} post={p} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
