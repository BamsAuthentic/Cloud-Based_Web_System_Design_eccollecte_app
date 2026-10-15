import { updateStatus, errorKey } from '../api.js';
import { useI18n } from '../i18n.jsx';
import Icon, { CATEGORY_ICONS } from './Icon.jsx';

const STATUSES = ['signale', 'en_cours', 'resolu'];

export default function ReportList({ reports, loading, adminKey, onChanged, onError }) {
  const { t, locale } = useI18n();

  async function change(id, status) {
    try {
      await updateStatus(id, status, adminKey);
      onChanged();
    } catch (err) {
      onError(errorKey(err));
    }
  }

  if (loading && reports.length === 0) {
    return (
      <ul className="list" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <li key={i} className="report skeleton">
            <span className="sk sk-icon" />
            <div className="sk-lines">
              <span className="sk sk-title" />
              <span className="sk" />
              <span className="sk sk-short" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="empty">
        <Icon name="inbox" size={40} />
        <p>{t('list.empty')}</p>
      </div>
    );
  }

  return (
    <ul className="list">
      {reports.map((r) => (
        <li key={r._id} className={`report status-${r.status} ${r.image ? 'has-photo' : ''}`}>
          {r.image && (
            <div className="report-photo">
              <img src={r.image} alt={r.title} loading="lazy" />
            </div>
          )}
          <span className="report-icon">
            <Icon name={CATEGORY_ICONS[r.category] || 'dots'} />
          </span>
          <div className="report-body">
            <div className="report-head">
              <h3>{r.title}</h3>
              <span className={`badge ${r.status}`}>
                <span className="dot" />
                {t(`status.${r.status}`)}
              </span>
            </div>
            <p>{r.description}</p>
            <ul className="meta">
              <li>
                <Icon name="pin" size={15} /> {r.neighborhood}
              </li>
              <li>
                <Icon name={CATEGORY_ICONS[r.category] || 'dots'} size={15} /> {t(`cat.${r.category}`)}
              </li>
              <li>
                <Icon name="calendar" size={15} />
                <time dateTime={r.createdAt}>
                  {new Date(r.createdAt).toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })}
                </time>
              </li>
            </ul>
            {adminKey && (
              <div className="segmented status-switch" role="group" aria-label={t('list.changeStatus')}>
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`${s} ${r.status === s ? 'active' : ''}`}
                    aria-pressed={r.status === s}
                    onClick={() => r.status !== s && change(r._id, s)}
                  >
                    {t(`status.${s}`)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
