import { useEffect, useState } from 'react';
import { useI18n } from '../i18n.jsx';
import { goToSection, href } from '../router.js';
import Icon from './Icon.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';

export function Brand({ className = '' }) {
  const { t } = useI18n();
  return (
    <a href={href.home} className={`brand ${className}`}>
      <span className="brand-mark">
        <Icon name="leaf" size={20} />
      </span>
      <span className="brand-text">
        <span className="brand-name">
          EcoCollecte <span>Bangui</span>
        </span>
        <span className="brand-sub">{t('app.subtitle')}</span>
      </span>
    </a>
  );
}

// Bandeau institutionnel : intitulés officiels, volontairement non traduits.
function GovBar() {
  return (
    <div className="gov-bar">
      <div className="shell gov-bar-inner">
        <div className="gov-left">
          <img className="gov-logo" src="/images/armoiries-rca.png" alt="" width="33" height="31" />
          <p className="gov-title">
            <strong>République Centrafricaine</strong>
            <span className="gov-motto">Unité · Dignité · Travail</span>
          </p>
        </div>
        <p className="gov-right">
          <img className="gov-logo" src="/images/logo-mairie-bangui.png" alt="" width="34" height="31" />
          <strong>Mairie de Bangui</strong>
        </p>
      </div>
    </div>
  );
}

export default function Header({ route, adminKey, onAgent }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [route]);

  const section = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    goToSection(id);
  };

  const links = [
    { label: t('nav.home'), href: href.home, active: route.name === 'home' },
    { label: t('nav.reports'), href: '#/', onClick: section('signalements') },
    { label: t('nav.gallery'), href: '#/', onClick: section('bangui-en-images') },
    { label: t('nav.news'), href: href.blog, active: route.name === 'blog' || route.name === 'article' },
    { label: t('nav.contact'), href: href.contact, active: route.name === 'contact' },
  ];

  return (
    <>
      <GovBar />
      <header className={`topbar ${open ? 'menu-open' : ''}`}>
        <div className="shell topbar-inner">
          <Brand />

          <nav className="nav" id="main-nav" aria-label="Navigation">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={l.onClick || (() => setOpen(false))}
                className={l.active ? 'active' : ''}
                aria-current={l.active ? 'page' : undefined}
              >
                {l.label}
              </a>
            ))}
            <div className="nav-lang">
              <span className="muted">{t('lang.label')}</span>
              <LanguageSwitcher />
            </div>
          </nav>

          <div className="topbar-actions">
            <span className="topbar-lang">
              <LanguageSwitcher />
            </span>
            <button
              type="button"
              className={`agent-btn ${adminKey ? 'on' : ''}`}
              onClick={onAgent}
              aria-label={t('agent.button')}
            >
              <Icon name={adminKey ? 'shield' : 'user'} size={18} />
              <span className="agent-btn-label">{adminKey ? t('agent.connected') : t('agent.button')}</span>
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              aria-expanded={open}
              aria-controls="main-nav"
              aria-label={open ? t('nav.close') : t('nav.menu')}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'x' : 'menu'} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
