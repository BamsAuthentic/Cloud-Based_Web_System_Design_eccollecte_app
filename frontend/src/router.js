import { useEffect, useState } from 'react';

// Mini-routeur par hash : #/ , #/actualites , #/actualites/<id>
function parse() {
  const path = window.location.hash.replace(/^#/, '') || '/';
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'actualites') return { name: parts[1] ? 'article' : 'blog', id: parts[1] };
  if (parts[0] === 'contact') return { name: 'contact' };
  return { name: 'home' };
}

export function useRoute() {
  const [route, setRoute] = useState(parse);

  useEffect(() => {
    const onChange = () => {
      setRoute(parse());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export const href = {
  home: '#/',
  blog: '#/actualites',
  article: (id) => `#/actualites/${id}`,
  contact: '#/contact',
};

// Aller à une section de l'accueil, depuis n'importe quelle page.
export function goToSection(id) {
  const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (parse().name === 'home') {
    scroll();
  } else {
    window.location.hash = '#/';
    setTimeout(scroll, 60);
  }
}
