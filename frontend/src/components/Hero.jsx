import { useI18n } from '../i18n.jsx';
import { goToSection, href } from '../router.js';
import { PHOTOS } from '../data/photos.js';
import Icon from './Icon.jsx';

export default function Hero() {
  const { t } = useI18n();
  const photo = PHOTOS.hotelDeVille;

  return (
    <section className="hero" id="top">
      <img className="hero-bg" src={photo.src} alt="" fetchpriority="high" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="shell hero-inner">
        <span className="eyebrow">
          <Icon name="pin" size={15} />
          {t('hero.eyebrow')}
        </span>
        <h1>
          {t('hero.title')} <span className="hl">{t('hero.titleHl')}</span>
        </h1>
        <p className="lead">{t('hero.lead')}</p>
        <div className="hero-actions">
          <a
            href="#/"
            className="btn btn-light"
            onClick={(e) => {
              e.preventDefault();
              goToSection('signaler');
            }}
          >
            <Icon name="plus" size={18} /> {t('hero.cta')}
          </a>
          <a href={href.blog} className="btn btn-ghost">
            <Icon name="newspaper" size={18} /> {t('hero.secondary')}
          </a>
        </div>
      </div>

      <a className="hero-credit" href={photo.source} target="_blank" rel="noreferrer">
        <Icon name="camera" size={13} /> {t('hero.photo')} · {photo.license}
      </a>
    </section>
  );
}
