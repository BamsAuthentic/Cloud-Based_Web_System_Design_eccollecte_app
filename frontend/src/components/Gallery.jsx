import { useI18n } from '../i18n.jsx';
import { CITY_GALLERY } from '../data/photos.js';
import Icon from './Icon.jsx';

// « Bangui la Coquette » : photos encadrées, chacune avec un titre et un court texte.
export default function Gallery() {
  const { t, lang } = useI18n();
  const pick = (field) => field[lang] ?? field.fr;

  return (
    <section className="section" id="bangui-en-images">
      <div className="section-intro">
        <span className="kicker">{t('gallery.eyebrow')}</span>
        <h2>{t('gallery.title')}</h2>
        <p className="muted">{t('gallery.lead')}</p>
      </div>

      <div className="frames">
        {CITY_GALLERY.map((p, i) => (
          <figure key={p.key} className={`frame ${i === 0 ? 'frame-lg' : ''}`}>
            <div className="frame-photo">
              <img src={p.src} alt={pick(p.title)} loading="lazy" />
            </div>
            <figcaption className="frame-text">
              <span className="frame-place">
                <Icon name="pin" size={14} /> {p.place}
              </span>
              <h3>{pick(p.title)}</h3>
              <p>{pick(p.text)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
