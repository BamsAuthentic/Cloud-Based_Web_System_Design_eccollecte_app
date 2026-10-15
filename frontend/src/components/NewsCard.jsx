import { useI18n } from '../i18n.jsx';
import { href } from '../router.js';
import Icon, { POST_ICONS } from './Icon.jsx';

export const readMinutes = (post) =>
  Math.max(1, Math.round(`${post.excerpt} ${post.content}`.split(/\s+/).length / 200));

export function PostTag({ category }) {
  const { t } = useI18n();
  return (
    <span className={`tag tag-${category}`}>
      <Icon name={POST_ICONS[category] || 'newspaper'} size={13} />
      {t(`postcat.${category}`)}
    </span>
  );
}

export function PostCover({ post, className = '' }) {
  return (
    <div className={`cover cover-${post.category} ${className}`}>
      {post.image ? (
        <img src={post.image} alt="" loading="lazy" />
      ) : (
        <Icon name={POST_ICONS[post.category] || 'newspaper'} size={48} />
      )}
    </div>
  );
}

export function PostMeta({ post }) {
  const { t, locale } = useI18n();
  return (
    <span className="post-meta">
      <time dateTime={post.createdAt}>
        {new Date(post.createdAt).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
      </time>
      <span aria-hidden="true">·</span>
      {t('news.minRead', { n: readMinutes(post) })}
    </span>
  );
}

export default function NewsCard({ post, featured = false }) {
  const { t } = useI18n();

  return (
    <article className={`news-card ${featured ? 'featured' : ''}`}>
      <a href={href.article(post._id)} className="news-link" aria-label={post.title}>
        <PostCover post={post} />
        <div className="news-body">
          <div className="news-tags">
            <PostTag category={post.category} />
            {featured && <span className="tag tag-featured">{t('news.featured')}</span>}
            {post.demo && <span className="tag tag-demo">{t('news.demo')}</span>}
          </div>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className="news-foot">
            <PostMeta post={post} />
            <span className="read-more">
              {t('news.read')} <Icon name="arrowRight" size={16} />
            </span>
          </div>
        </div>
      </a>
    </article>
  );
}
