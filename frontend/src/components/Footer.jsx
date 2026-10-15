import { useI18n } from '../i18n.jsx';
import { goToSection, href } from '../router.js';
import { CONTACT } from '../config.js';
import { Brand } from './Header.jsx';
import Icon from './Icon.jsx';

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const section = (id) => (e) => {
    e.preventDefault();
    goToSection(id);
  };

  return (
    <footer className="footer">
      <div className="shell footer-grid">
        <div className="footer-about">
          <Brand className="brand-footer" />
          <p>{t('footer.about')}</p>
          <p className="motto">République Centrafricaine · Unité · Dignité · Travail</p>
        </div>

        <nav className="footer-col" aria-label={t('footer.nav')}>
          <h3>{t('footer.nav')}</h3>
          <a href={href.home}>{t('nav.home')}</a>
          <a href="#/" onClick={section('signaler')}>
            {t('hero.cta')}
          </a>
          <a href="#/" onClick={section('signalements')}>
            {t('nav.reports')}
          </a>
          <a href={href.blog}>{t('nav.news')}</a>
          <a href={href.contact}>{t('nav.contact')}</a>
        </nav>

        <div className="footer-col">
          <h3>{t('nav.contact')}</h3>
          <p className="footer-line">
            <Icon name="building" size={16} />
            <span>
              {CONTACT.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </p>
          <p className="footer-line">
            <Icon name="mail" size={16} />
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <a href={href.contact} className="footer-cta">
            <Icon name="map" size={16} /> {t('contact.mapTitle')}
          </a>
        </div>

        <div className="footer-col">
          <h3>{t('footer.madeBy')}</h3>
          <p className="company">Digital Bé Africa Consulting</p>
          <h3 className="footer-h3-gap">{t('footer.credits')}</h3>
          <p className="small">{t('footer.creditsText')}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="shell footer-bottom-inner">
          <p>
            © {year} <strong>Digital Bé Africa Consulting</strong>. {t('footer.rights')}
          </p>
          <p className="footer-sub">EcoCollecte Bangui · Mairie de Bangui</p>
        </div>
      </div>
    </footer>
  );
}
