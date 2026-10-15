import { useEffect, useState } from 'react';
import { deletePost, errorKey } from '../api.js';
import { useI18n } from '../i18n.jsx';
import { href } from '../router.js';
import Icon from './Icon.jsx';
import NewsCard, { PostCover, PostMeta, PostTag } from './NewsCard.jsx';

export default function ArticlePage({ id, posts, loading, adminKey, onDeleted }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [errorK, setErrorK] = useState('');

  const post = posts.find((p) => p._id === id);

  useEffect(() => {
    if (post) document.title = `${post.title} · EcoCollecte Bangui`;
    return () => {
      document.title = 'EcoCollecte Bangui';
    };
  }, [post]);

  if (!post) {
    return (
      <main className="shell page article-page">
        <a href={href.blog} className="back-link">
          <Icon name="arrowLeft" size={18} /> {t('news.back')}
        </a>
        {loading ? (
          <div className="article skeleton">
            <span className="sk sk-title" />
            <span className="sk sk-cover" />
          </div>
        ) : (
          <div className="empty">
            <Icon name="newspaper" size={40} />
            <h1 className="empty-title">{t('news.notFoundTitle')}</h1>
            <p>{t('news.notFound')}</p>
          </div>
        )}
      </main>
    );
  }

  const related = posts.filter((p) => p._id !== post._id).slice(0, 3);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* presse-papiers indisponible */
    }
  }

  async function remove() {
    if (!confirm) {
      setConfirm(true);
      return;
    }
    try {
      await deletePost(post._id, adminKey);
      onDeleted();
      window.location.hash = href.blog;
    } catch (err) {
      setErrorK(errorKey(err));
      setConfirm(false);
    }
  }

  return (
    <main className="page article-page">
      <article className="article">
        <div className="shell shell-narrow">
          <a href={href.blog} className="back-link">
            <Icon name="arrowLeft" size={18} /> {t('news.back')}
          </a>
          <div className="news-tags">
            <PostTag category={post.category} />
            {post.demo && <span className="tag tag-demo">{t('news.demo')}</span>}
          </div>
          <h1>{post.title}</h1>
          <div className="article-byline">
            <span className="byline-avatar">
              <Icon name="megaphone" size={18} />
            </span>
            <div>
              <strong>
                {t('news.by')} {post.author || 'Mairie de Bangui'}
              </strong>
              <PostMeta post={post} />
            </div>
          </div>
        </div>

        <div className="shell shell-wide">
          <PostCover post={post} className="article-cover" />
        </div>

        <div className="shell shell-narrow">
          <p className="article-lead">{post.excerpt}</p>
          <div className="article-content">
            {post.content.split(/\n{2,}/).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {errorK && (
            <p className="alert alert-error" role="alert">
              <Icon name="alert" size={18} /> {t(errorK)}
            </p>
          )}

          <div className="article-actions">
            <button type="button" className="btn btn-outline" onClick={copyLink}>
              <Icon name={copied ? 'check' : 'link'} size={18} /> {copied ? t('news.copied') : t('news.share')}
            </button>
            {adminKey && (
              <button
                type="button"
                className={`btn btn-danger ${confirm ? 'confirm' : ''}`}
                onClick={remove}
                onBlur={() => setConfirm(false)}
              >
                <Icon name="trash" size={18} /> {confirm ? t('news.deleteConfirm') : t('news.delete')}
              </button>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="shell related">
          <h2>{t('news.related')}</h2>
          <div className="news-grid">
            {related.map((p) => (
              <NewsCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
