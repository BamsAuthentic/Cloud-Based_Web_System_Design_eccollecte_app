import { useState } from 'react';
import { errorKey, isMock, sendContact } from '../api.js';
import { useI18n } from '../i18n.jsx';
import { CONTACT, MAPS } from '../config.js';
import Icon from './Icon.jsx';

const SUBJECTS = ['signalement', 'suggestion', 'partenariat', 'presse', 'autre'];
const empty = { name: '', email: '', phone: '', subject: 'signalement', message: '' };

export default function ContactPage() {
  const { t, lang } = useI18n();
  const [form, setForm] = useState(empty);
  const [errorK, setErrorK] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setErrorK('');
    setSent(false);
    setLoading(true);
    try {
      await sendContact(form);
      setForm(empty);
      setSent(true);
    } catch (err) {
      const k = errorKey(err);
      setErrorK(k === 'err.invalid' ? 'err.invalidContact' : k);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="page-hero">
        <div className="shell">
          <span className="kicker kicker-light">{t('contact.eyebrow')}</span>
          <h1>{t('contact.title')}</h1>
          <p className="lead">{t('contact.lead')}</p>
        </div>
      </section>

      <main className="shell page">
        <div className="contact-grid">
          <form className="card form card-accent" onSubmit={submit}>
            <div className="card-head">
              <span className="head-icon">
                <Icon name="message" />
              </span>
              <div>
                <h2>{t('contact.formTitle')}</h2>
                <p className="muted">{t('contact.formLead')}</p>
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="c-name">{t('contact.name')}</label>
                <input
                  id="c-name"
                  name="name"
                  autoComplete="name"
                  placeholder={t('contact.namePh')}
                  value={form.name}
                  onChange={change}
                  minLength={2}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="c-phone">{t('contact.phone')}</label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+236 …"
                  value={form.phone}
                  onChange={change}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="c-email">{t('contact.email')}</label>
              <div className="input-icon">
                <Icon name="mail" size={18} />
                <input
                  id="c-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('contact.emailPh')}
                  value={form.email}
                  onChange={change}
                  required
                />
              </div>
            </div>

            <fieldset className="field">
              <legend>{t('contact.subject')}</legend>
              <div className="chips">
                {SUBJECTS.map((s) => (
                  <label key={s} className={`chip ${form.subject === s ? 'checked' : ''}`}>
                    <input type="radio" name="subject" value={s} checked={form.subject === s} onChange={change} />
                    {t(`contact.s.${s}`)}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field">
              <label htmlFor="c-message">{t('contact.message')}</label>
              <textarea
                id="c-message"
                name="message"
                rows="6"
                placeholder={t('contact.messagePh')}
                value={form.message}
                onChange={change}
                minLength={10}
                required
              />
            </div>

            {errorK && (
              <p className="alert alert-error" role="alert">
                <Icon name="alert" size={18} /> {t(errorK)}
              </p>
            )}
            {sent && (
              <p className={`alert ${isMock ? 'alert-info' : 'alert-success'}`} role="status">
                <Icon name={isMock ? 'info' : 'check'} size={18} />
                {isMock ? t('contact.successDemo') : t('contact.success')}
              </p>
            )}

            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? <span className="spinner" aria-hidden="true" /> : <Icon name="send" size={18} />}
              {loading ? t('form.sending') : t('contact.submit')}
            </button>
          </form>

          <aside className="contact-side">
            <div className="card info-card">
              <span className="head-icon">
                <Icon name="building" />
              </span>
              <div>
                <h3>{t('contact.address')}</h3>
                <address>
                  {CONTACT.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </div>
            </div>

            <div className="card info-card">
              <span className="head-icon">
                <Icon name="mail" />
              </span>
              <div>
                <h3>{t('contact.emailLabel')}</h3>
                <a className="info-link" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
              </div>
            </div>

            <div className="card map-card">
              <div className="map-head">
                <h3>
                  <Icon name="map" size={18} /> {t('contact.mapTitle')}
                </h3>
              </div>
              <iframe
                className="map-frame"
                title={t('contact.mapFrame')}
                src={MAPS.embed(lang)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="map-actions">
                <a className="btn btn-outline" href={MAPS.open} target="_blank" rel="noreferrer">
                  <Icon name="external" size={16} /> {t('contact.openMaps')}
                </a>
                <a className="btn btn-primary" href={MAPS.directions} target="_blank" rel="noreferrer">
                  <Icon name="navigation" size={16} /> {t('contact.directions')}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
