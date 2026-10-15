import { useRef, useState } from 'react';
import { createReport, errorKey } from '../api.js';
import { useI18n } from '../i18n.jsx';
import { resizeImage } from '../image.js';
import { NEIGHBORHOODS } from '../data/places.js';
import Icon, { CATEGORY_ICONS } from './Icon.jsx';

const CATEGORIES = ['depot_sauvage', 'plastique', 'organique', 'encombrants', 'autre'];
const empty = { title: '', description: '', category: 'depot_sauvage', neighborhood: '', image: '' };

export default function ReportForm({ onCreated }) {
  const { t } = useI18n();
  const fileRef = useRef(null);
  const [form, setForm] = useState(empty);
  const [errorK, setErrorK] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function pickPhoto(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      setForm((f) => ({ ...f, image: '' }));
      const image = await resizeImage(file, 1000);
      setForm((f) => ({ ...f, image }));
      setErrorK('');
    } catch {
      setErrorK('err.image');
    }
  }

  async function submit(e) {
    e.preventDefault();
    setErrorK('');
    setSuccess(false);
    setLoading(true);
    try {
      await createReport(form);
      setForm(empty);
      setSuccess(true);
      onCreated();
    } catch (err) {
      setErrorK(errorKey(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="card form card-accent" onSubmit={submit}>
      <div className="card-head">
        <span className="head-icon">
          <Icon name="plus" />
        </span>
        <div>
          <h2>{t('form.title')}</h2>
          <p className="muted">{t('form.subtitle')}</p>
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-title">{t('form.titleField')}</label>
        <input
          id="f-title"
          name="title"
          placeholder={t('form.titlePh')}
          value={form.title}
          onChange={change}
          minLength={3}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="f-neighborhood">{t('form.neighborhood')}</label>
        <div className="input-icon">
          <Icon name="pin" size={18} />
          <input
            id="f-neighborhood"
            name="neighborhood"
            list="quartiers"
            autoComplete="off"
            placeholder={t('form.neighborhoodPh')}
            value={form.neighborhood}
            onChange={change}
            minLength={2}
            required
          />
          <datalist id="quartiers">
            {NEIGHBORHOODS.map((n) => (
              <option key={n} value={n} />
            ))}
          </datalist>
        </div>
      </div>

      <fieldset className="field">
        <legend>{t('form.category')}</legend>
        <div className="chips">
          {CATEGORIES.map((c) => (
            <label key={c} className={`chip ${form.category === c ? 'checked' : ''}`}>
              <input type="radio" name="category" value={c} checked={form.category === c} onChange={change} />
              <Icon name={CATEGORY_ICONS[c]} size={16} />
              {t(`cat.${c}`)}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="f-description">{t('form.description')}</label>
        <textarea
          id="f-description"
          name="description"
          rows="4"
          placeholder={t('form.descriptionPh')}
          value={form.description}
          onChange={change}
          minLength={5}
          required
        />
      </div>

      <div className="field">
        <span className="field-label">{t('form.photo')}</span>
        {form.image ? (
          <div className="photo-preview">
            <img src={form.image} alt="" />
            <button
              type="button"
              className="icon-btn photo-remove"
              aria-label={t('form.photoRemove')}
              onClick={() => setForm({ ...form, image: '' })}
            >
              <Icon name="x" size={18} />
            </button>
          </div>
        ) : (
          <button type="button" className="dropzone" onClick={() => fileRef.current?.click()}>
            <Icon name="camera" size={22} />
            <span>
              <strong>{t('form.photoAdd')}</strong>
              <small>{t('form.photoHint')}</small>
            </span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={pickPhoto} />
      </div>

      {errorK && (
        <p className="alert alert-error" role="alert">
          <Icon name="alert" size={18} /> {t(errorK)}
        </p>
      )}
      {success && (
        <p className="alert alert-success" role="status">
          <Icon name="check" size={18} /> {t('form.success')}
        </p>
      )}

      <button className="btn btn-primary btn-block" disabled={loading}>
        {loading ? <span className="spinner" aria-hidden="true" /> : <Icon name="send" size={18} />}
        {loading ? t('form.sending') : t('form.submit')}
      </button>
    </form>
  );
}
