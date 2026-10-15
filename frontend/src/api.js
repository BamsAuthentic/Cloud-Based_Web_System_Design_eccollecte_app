// Sans VITE_API_URL, l'application utilise un faux serveur dans le navigateur.
// « / » signifie : l'API est servie par le même site que le front-end.
export const isMock = !import.meta.env.VITE_API_URL;
const BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export class ApiError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

export function errorKey(err) {
  if (err instanceof ApiError) {
    if (err.status === 400) return 'err.invalid';
    if (err.status === 401) return 'err.unauthorized';
    if (err.status === 404) return 'err.notFound';
    if (err.status === 413) return 'err.tooLarge';
    if (err.status === 429) return 'err.tooMany';
    if (err.status === 0) return 'err.network';
  }
  return 'err.generic';
}

/* ---------- Vrai serveur ---------- */

async function request(path, options = {}) {
  const { headers, ...rest } = options;
  let res;
  try {
    res = await fetch(`${BASE}/api${path}`, {
      ...rest,
      headers: { 'Content-Type': 'application/json', ...(headers || {}) },
    });
  } catch {
    throw new ApiError(0);
  }
  if (!res.ok) throw new ApiError(res.status);
  return res.status === 204 ? null : res.json();
}

/* ---------- Mode démo (localStorage) ---------- */

const REPORTS_KEY = 'ecocollecte-bangui-reports';
const POSTS_KEY = 'ecocollecte-bangui-posts';
const DEMO_ADMIN_KEY = 'demo';
const STATUSES = ['signale', 'en_cours', 'resolu'];
export const POST_CATEGORIES = ['flash', 'annonce', 'sensibilisation', 'conseil', 'evenement'];

const daysAgo = (n) => new Date(Date.now() - 86400000 * n).toISOString();

const seedReports = () => [
  {
    _id: 'seed-1',
    title: 'Ordures accumulées autour du marché',
    description: 'Sacs plastiques et restes alimentaires éparpillés devant les étals depuis plusieurs jours.',
    category: 'depot_sauvage',
    neighborhood: 'Cantonnier',
    image: '/images/marche-cantonnier.jpg',
    status: 'signale',
    createdAt: daysAgo(1),
  },
  {
    _id: 'seed-2',
    title: 'Caniveaux bouchés, eau stagnante',
    description: 'Les canaux sont obstrués par des déchets ; l’eau ne s’écoule plus après la pluie.',
    category: 'plastique',
    neighborhood: 'Kodjo',
    image: '/images/inondation-kodjo.jpg',
    status: 'en_cours',
    createdAt: daysAgo(2),
  },
  {
    _id: 'seed-3',
    title: 'Débris laissés par l’inondation',
    description: 'Branches, tôles et déchets ménagers charriés par les eaux devant les habitations.',
    category: 'encombrants',
    neighborhood: 'Landja',
    image: '/images/inondation-landja.jpg',
    status: 'signale',
    createdAt: daysAgo(3),
  },
  {
    _id: 'seed-4',
    title: 'Dépôt sauvage au bord de la route',
    description: 'Tas d’ordures ménagères brûlé en partie, fumée gênante pour les riverains.',
    category: 'organique',
    neighborhood: 'Boy-Rabe',
    status: 'resolu',
    createdAt: daysAgo(6),
  },
];

const P = (...paragraphs) => paragraphs.join('\n\n');

const seedPosts = () => [
  {
    _id: 'saison-des-pluies-caniveaux',
    title: 'Saison des pluies : ne jetez pas vos déchets dans les caniveaux',
    category: 'flash',
    breaking: true,
    demo: true,
    excerpt:
      'Les caniveaux obstrués aggravent les inondations dans plusieurs quartiers. Un seul sac jeté dans un canal peut provoquer un débordement.',
    content: P(
      'Avec le retour des fortes pluies, plusieurs quartiers de Bangui connaissent des inondations. Une grande partie de ces débordements est due à des caniveaux bouchés par des sacs plastiques, des bouteilles et des ordures ménagères.',
      'Chaque déchet jeté dans un canal finit par bloquer l’écoulement de l’eau. Les conséquences sont lourdes : maisons inondées, routes impraticables, eaux stagnantes favorables aux moustiques et aux maladies.',
      'Gardez vos déchets dans un sac fermé jusqu’au passage de la collecte. Si vous constatez un caniveau obstrué, signalez-le sur EcoCollecte en indiquant le quartier et, si possible, une photo.'
    ),
    image: '/images/inondation-kodjo-2.jpg',
    author: 'Mairie de Bangui',
    createdAt: daysAgo(0),
  },
  {
    _id: 'operation-quartier-propre',
    title: 'Opération « Quartier propre » : associations et jeunes mobilisés',
    category: 'annonce',
    breaking: true,
    demo: true,
    excerpt:
      'La Mairie invite les associations, les chefs de quartier et les jeunes volontaires à participer aux prochaines journées de salubrité.',
    content: P(
      'Rendre à Bangui son surnom de « Coquette » est l’affaire de tous. Les journées de salubrité permettent de nettoyer ensemble les rues, les marchés et les abords des caniveaux.',
      'Les associations de quartier et les groupes de jeunes qui souhaitent participer peuvent se faire connaître auprès de leur mairie d’arrondissement. Les dates et les points de rassemblement seront publiés dans cette rubrique.',
      'Pensez à venir avec des gants et des sacs. La sécurité des volontaires reste la priorité : ne manipulez jamais d’objets tranchants à mains nues.'
    ),
    image: '/images/bangui-centre.jpg',
    author: 'Mairie de Bangui',
    createdAt: daysAgo(1),
  },
  {
    _id: 'cinq-gestes-quartier-propre',
    title: '5 gestes simples pour un quartier propre',
    category: 'sensibilisation',
    breaking: false,
    demo: true,
    excerpt: 'Trier, stocker, ne pas brûler, signaler, montrer l’exemple : de petits gestes qui changent tout.',
    content: P(
      '1. Gardez vos ordures dans un récipient fermé, à l’abri des animaux et de la pluie.',
      '2. Séparez les déchets organiques (épluchures, restes de repas), qui peuvent servir de compost, des plastiques et des métaux.',
      '3. Ne brûlez pas vos déchets : la fumée des plastiques est toxique, surtout pour les enfants.',
      '4. Ne jetez rien dans les caniveaux ni dans la rivière.',
      '5. Signalez les dépôts sauvages sur EcoCollecte : chaque signalement aide les équipes de collecte à intervenir au bon endroit.'
    ),
    image: '/images/inondation-landja.jpg',
    author: 'Mairie de Bangui',
    createdAt: daysAgo(3),
  },
  {
    _id: 'cinema-environnement',
    title: 'Le cinéma au service de l’environnement',
    category: 'evenement',
    breaking: false,
    demo: true,
    excerpt:
      'Lors du festival pour la promotion de l’environnement en Centrafrique, un documentaire sur les déchets a été projeté devant un public nombreux.',
    content: P(
      'Montrer pour faire comprendre : la projection d’un documentaire consacré aux déchets a permis au public de voir concrètement l’impact des ordures sur les quartiers, les cours d’eau et la santé.',
      'Ce type d’événement complète les actions de terrain. La Mairie encourage les écoles, les associations et les médias à relayer ces messages de sensibilisation.'
    ),
    image: '/images/festival-environnement-1.jpg',
    author: 'Mairie de Bangui',
    createdAt: daysAgo(5),
  },
  {
    _id: 'ne-pas-bruler-plastique',
    title: 'Pourquoi il ne faut pas brûler les plastiques',
    category: 'conseil',
    breaking: false,
    demo: true,
    excerpt: 'Brûler les ordures semble pratique, mais la fumée des plastiques est dangereuse pour la santé de toute la famille.',
    content: P(
      'Lorsqu’on brûle des sacs, des bouteilles ou des emballages en plastique, la fumée libère des substances toxiques. Elles irritent les yeux et les poumons et sont particulièrement dangereuses pour les enfants, les personnes âgées et les femmes enceintes.',
      'Les cendres polluent aussi le sol et l’eau. La meilleure solution reste de stocker ces déchets dans un sac fermé jusqu’à leur collecte.'
    ),
    image: '/images/festival-environnement-2.jpg',
    author: 'Mairie de Bangui',
    createdAt: daysAgo(8),
  },
];

function read(key, seed) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignoré */
  }
  const initial = seed();
  write(key, initial);
  return initial;
}

function write(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // Quota dépassé (photos trop nombreuses en mode démo)
    if (err?.name === 'QuotaExceededError') throw new ApiError(413);
  }
}

const delay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 200));
const byDate = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
const slug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);

const mock = {
  async getReports(status) {
    const all = read(REPORTS_KEY, seedReports).sort(byDate);
    return delay(STATUSES.includes(status) ? all.filter((r) => r.status === status) : all);
  },
  async getStats() {
    const stats = { signale: 0, en_cours: 0, resolu: 0, total: 0 };
    for (const r of read(REPORTS_KEY, seedReports)) {
      stats[r.status] += 1;
      stats.total += 1;
    }
    return delay(stats);
  },
  async createReport(p) {
    const title = (p.title || '').trim();
    const description = (p.description || '').trim();
    const neighborhood = (p.neighborhood || '').trim();
    if (title.length < 3 || description.length < 5 || neighborhood.length < 2) {
      throw new ApiError(400);
    }
    const report = {
      _id: crypto.randomUUID(),
      title,
      description,
      neighborhood,
      category: p.category || 'depot_sauvage',
      image: p.image || '',
      status: 'signale',
      createdAt: new Date().toISOString(),
    };
    write(REPORTS_KEY, [report, ...read(REPORTS_KEY, seedReports)]);
    return delay(report);
  },
  async updateStatus(id, status, adminKey) {
    if (adminKey !== DEMO_ADMIN_KEY) throw new ApiError(401);
    if (!STATUSES.includes(status)) throw new ApiError(400);
    const all = read(REPORTS_KEY, seedReports).map((r) => (r._id === id ? { ...r, status } : r));
    write(REPORTS_KEY, all);
    return delay(all.find((r) => r._id === id));
  },

  async getPosts() {
    return delay(read(POSTS_KEY, seedPosts).sort(byDate));
  },
  async getPost(id) {
    const post = read(POSTS_KEY, seedPosts).find((p) => p._id === id);
    if (!post) throw new ApiError(404);
    return delay(post);
  },
  async createPost(p, adminKey) {
    if (adminKey !== DEMO_ADMIN_KEY) throw new ApiError(401);
    const title = (p.title || '').trim();
    const excerpt = (p.excerpt || '').trim();
    const content = (p.content || '').trim();
    if (title.length < 5 || excerpt.length < 10 || content.length < 20 || !POST_CATEGORIES.includes(p.category)) {
      throw new ApiError(400);
    }
    const all = read(POSTS_KEY, seedPosts);
    let id = slug(title) || crypto.randomUUID();
    if (all.some((x) => x._id === id)) id = `${id}-${Date.now().toString(36)}`;
    const post = {
      _id: id,
      title,
      excerpt,
      content,
      category: p.category,
      breaking: !!p.breaking,
      image: p.image || '',
      author: 'Mairie de Bangui',
      createdAt: new Date().toISOString(),
    };
    write(POSTS_KEY, [post, ...all]);
    return delay(post);
  },
  async deletePost(id, adminKey) {
    if (adminKey !== DEMO_ADMIN_KEY) throw new ApiError(401);
    write(
      POSTS_KEY,
      read(POSTS_KEY, seedPosts).filter((p) => p._id !== id)
    );
    return delay(null);
  },
};

/* ---------- API exposée à l'application ---------- */

const admin = (adminKey) => ({ 'x-admin-key': adminKey });

// Les photos stockées par l'API ont une adresse relative (/api/images/...) : on la complète.
const withImage = (item) =>
  item?.image?.startsWith('/api/') ? { ...item, image: BASE + item.image } : item;
const withImages = (list) => list.map(withImage);

export const getReports = (status = '') =>
  isMock
    ? mock.getReports(status)
    : request(`/reports${status ? `?status=${status}` : ''}`).then(withImages);

export const getStats = () => (isMock ? mock.getStats() : request('/reports/stats'));

export const createReport = (payload) =>
  isMock ? mock.createReport(payload) : request('/reports', { method: 'POST', body: JSON.stringify(payload) });

export const updateStatus = (id, status, adminKey) =>
  isMock
    ? mock.updateStatus(id, status, adminKey)
    : request(`/reports/${id}/status`, {
        method: 'PATCH',
        headers: admin(adminKey),
        body: JSON.stringify({ status }),
      });

const MESSAGES_KEY = 'ecocollecte-bangui-messages';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// En mode démo, le message est seulement conservé dans le navigateur : il n'est PAS envoyé.
export const sendContact = async (p) => {
  if (!isMock) return request('/contact', { method: 'POST', body: JSON.stringify(p) });
  const name = (p.name || '').trim();
  const email = (p.email || '').trim();
  const message = (p.message || '').trim();
  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) throw new ApiError(400);
  const entry = { ...p, name, email, message, _id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  write(MESSAGES_KEY, [entry, ...read(MESSAGES_KEY, () => [])]);
  return delay(entry);
};

export const getPosts = () => (isMock ? mock.getPosts() : request('/posts').then(withImages));

export const getPost = (id) =>
  isMock ? mock.getPost(id) : request(`/posts/${encodeURIComponent(id)}`).then(withImage);

// Vérifie la clé saisie dans l'espace agent (401 si elle est fausse).
export const verifyAgent = async (adminKey) => {
  if (!isMock) return request('/agent/verify', { method: 'POST', headers: admin(adminKey) });
  if (adminKey !== DEMO_ADMIN_KEY) throw new ApiError(401);
  return delay(null);
};

export const createPost = (payload, adminKey) =>
  isMock
    ? mock.createPost(payload, adminKey)
    : request('/posts', { method: 'POST', headers: admin(adminKey), body: JSON.stringify(payload) });

export const deletePost = (id, adminKey) =>
  isMock
    ? mock.deletePost(id, adminKey)
    : request(`/posts/${encodeURIComponent(id)}`, { method: 'DELETE', headers: admin(adminKey) });
