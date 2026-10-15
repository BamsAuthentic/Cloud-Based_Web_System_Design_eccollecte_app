import { useRef, useState } from 'react';
import { createPost, errorKey, POST_CATEGORIES } from '../api.js';
import { useI18n } from '../i18n.jsx';
import { resizeImage } from '../image.js';
import { CITY_GALLERY, PHOTOS } from '../data/photos.js';
import Icon, { POST_ICONS } from './Icon.jsx';
import Modal from './Modal.jsx';

const empty = { title: '', category: 'sensibilisation', excerpt: '', content: '', image: '', breaking: false };

export default function PostEditor({ open, onClose, adminKey, onCreated }) {
  const { t } = useI18n();
  const fileRef = useRef(null);
  const [form, setForm] = useState(empty);
  const [errorK, setErrorK] = useState('');
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => {
      const next = { ...f, [name]: type === 'checkbox' ? checked : value };
      if (name === 'category') next.breaking = value === 'flash' ? true : f.breaking;
      return next;
    });
  };

  async function upload(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const image = await resizeImage(file, 1400);
      setForm((f) => ({ ...f, image }));
    } catch {
      setErrorK('err.image');
    }
  }

  async function submit(e) {
    e.preventDefault();
    setErrorK('');
    setLoading(true);
    try {
      const post = await createPost(form, adminKey);
      setForm(empty);
      onCreated(post);
    } catch (err) {
      setErrorK(errorKey(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} labelledBy="editor-title" className="modal-lg">
      <div className="modal-head">
        <span className="head-icon head-icon-blue">
          <Icon name="newspaper" />
        </span>
        <div>
          <h2 id="editor-title">{t('editor.title')}</h2>
          <p className="muted">{t('editor.lead')}</p>
        </div>
        <button type="button" className="icon-btn" onClick={onClose} aria-label={t('nav.close')}>
          <Icon name="x" />
        </button>
      </div>

      <form className="modal-body editor" onSubmit={submit}>
        <div className="field">
          <label htmlFor="p-title">{t('editor.titleField')}</label>
          <input
            id="p-title"
            name="title"
            value={form.title}
            onChange={change}
            placeholder={t('editor.titlePh')}
            minLength={5}
            required
          />
        </div>

        <fieldset className="field">
          <legend>{t('editor.category')}</legend>
          <div className="chips">
            {POST_CATEGORIES.map((c) => (
              <label key={c} className={`chip ${form.category === c ? 'checked' : ''}`}>
                <input type="radio" name="category" value={c} checked={form.category === c} onChange={change} />
                <Icon name={POST_ICONS[c]} size={16} />
                {t(`postcat.${c}`)}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor="p-excerpt">{t('editor.excerpt')}</label>
          <textarea
            id="p-excerpt"
            name="excerpt"
            rows="2"
            value={form.excerpt}
            onChange={change}
            placeholder={t('editor.excerptPh')}
            minLength={10}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="p-content">{t('editor.content')}</label>
          <textarea
            id="p-content"
            name="content"
            rows="8"
            value={form.content}
            onChange={change}
            placeholder={t('editor.contentPh')}
            minLength={20}
            required
          />
        </div>

        <div className="field">
          <span className="field-label">{t('editor.image')}</span>
          {form.image ? (
            <div className="photo-preview photo-preview-wide">
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
            <>
              <button type="button" className="dropzone" onClick={() => fileRef.current?.click()}>
                <Icon name="image" size={22} />
                <span>
                  <strong>{t('editor.upload')}</strong>
                  <small>JPG, PNG</small>
                </span>
              </button>
              <small className="muted">{t('editor.library')}</small>
              <div className="library">
                {[...Object.entries(PHOTOS), ...CITY_GALLERY.map((c) => [c.key, c])].map(([key, p]) => (
                  <button
                    key={key}
                    type="button"
                    className="library-item"
                    onClick={() => setForm({ ...form, image: p.src })}
                    aria-label={p.place}
                    title={p.place}
                  >
                    <img src={p.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </>
          )}
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={upload} />
        </div>

        <label className="switch">
          <input type="checkbox" name="breaking" checked={form.breaking} onChange={change} />
          <span className="switch-track" aria-hidden="true" />
          <span>
            <Icon name="bolt" size={16} /> {t('editor.breaking')}
          </span>
        </label>

        {errorK && (
          <p className="alert alert-error" role="alert">
            <Icon name="alert" size={18} /> {t(errorK)}
          </p>
        )}

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {t('editor.cancel')}
          </button>
          <button className="btn btn-primary" disabled={loading}>
            {loading ? <span className="spinner" aria-hidden="true" /> : <Icon name="send" size={18} />}
            {loading ? t('editor.publishing') : t('editor.submit')}
          </button>
        </div>
      </form>
    </Modal>
  );
}
