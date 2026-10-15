// Ajoute les articles d'exemple (marqués « Exemple » sur le site) si la rubrique est vide.
// Usage : npm run seed
import 'dotenv/config';
import mongoose from 'mongoose';
import Post from './models/Post.js';

const P = (...paragraphs) => paragraphs.join('\n\n');
const daysAgo = (n) => new Date(Date.now() - 86400000 * n);

const posts = [
  {
    _id: 'saison-des-pluies-caniveaux',
    title: 'Saison des pluies : ne jetez pas vos déchets dans les caniveaux',
    category: 'flash',
    breaking: true,
    excerpt:
      'Les caniveaux obstrués aggravent les inondations dans plusieurs quartiers. Un seul sac jeté dans un canal peut provoquer un débordement.',
    content: P(
      'Avec le retour des fortes pluies, plusieurs quartiers de Bangui connaissent des inondations. Une grande partie de ces débordements est due à des caniveaux bouchés par des sacs plastiques, des bouteilles et des ordures ménagères.',
      'Chaque déchet jeté dans un canal finit par bloquer l’écoulement de l’eau. Les conséquences sont lourdes : maisons inondées, routes impraticables, eaux stagnantes favorables aux moustiques et aux maladies.',
      'Gardez vos déchets dans un sac fermé jusqu’au passage de la collecte. Si vous constatez un caniveau obstrué, signalez-le sur EcoCollecte en indiquant le quartier et, si possible, une photo.'
    ),
    image: '/images/inondation-kodjo-2.jpg',
    createdAt: daysAgo(0),
  },
  {
    _id: 'operation-quartier-propre',
    title: 'Opération « Quartier propre » : associations et jeunes mobilisés',
    category: 'annonce',
    breaking: true,
    excerpt:
      'La Mairie invite les associations, les chefs de quartier et les jeunes volontaires à participer aux prochaines journées de salubrité.',
    content: P(
      'Rendre à Bangui son surnom de « Coquette » est l’affaire de tous. Les journées de salubrité permettent de nettoyer ensemble les rues, les marchés et les abords des caniveaux.',
      'Les associations de quartier et les groupes de jeunes qui souhaitent participer peuvent se faire connaître auprès de leur mairie d’arrondissement. Les dates et les points de rassemblement seront publiés dans cette rubrique.',
      'Pensez à venir avec des gants et des sacs. La sécurité des volontaires reste la priorité : ne manipulez jamais d’objets tranchants à mains nues.'
    ),
    image: '/images/bangui-centre.jpg',
    createdAt: daysAgo(1),
  },
  {
    _id: 'cinq-gestes-quartier-propre',
    title: '5 gestes simples pour un quartier propre',
    category: 'sensibilisation',
    excerpt: 'Trier, stocker, ne pas brûler, signaler, montrer l’exemple : de petits gestes qui changent tout.',
    content: P(
      '1. Gardez vos ordures dans un récipient fermé, à l’abri des animaux et de la pluie.',
      '2. Séparez les déchets organiques (épluchures, restes de repas), qui peuvent servir de compost, des plastiques et des métaux.',
      '3. Ne brûlez pas vos déchets : la fumée des plastiques est toxique, surtout pour les enfants.',
      '4. Ne jetez rien dans les caniveaux ni dans la rivière.',
      '5. Signalez les dépôts sauvages sur EcoCollecte : chaque signalement aide les équipes de collecte à intervenir au bon endroit.'
    ),
    image: '/images/inondation-landja.jpg',
    createdAt: daysAgo(3),
  },
  {
    _id: 'cinema-environnement',
    title: 'Le cinéma au service de l’environnement',
    category: 'evenement',
    excerpt:
      'Lors du festival pour la promotion de l’environnement en Centrafrique, un documentaire sur les déchets a été projeté devant un public nombreux.',
    content: P(
      'Montrer pour faire comprendre : la projection d’un documentaire consacré aux déchets a permis au public de voir concrètement l’impact des ordures sur les quartiers, les cours d’eau et la santé.',
      'Ce type d’événement complète les actions de terrain. La Mairie encourage les écoles, les associations et les médias à relayer ces messages de sensibilisation.'
    ),
    image: '/images/festival-environnement-1.jpg',
    createdAt: daysAgo(5),
  },
  {
    _id: 'ne-pas-bruler-plastique',
    title: 'Pourquoi il ne faut pas brûler les plastiques',
    category: 'conseil',
    excerpt: 'Brûler les ordures semble pratique, mais la fumée des plastiques est dangereuse pour la santé de toute la famille.',
    content: P(
      'Lorsqu’on brûle des sacs, des bouteilles ou des emballages en plastique, la fumée libère des substances toxiques. Elles irritent les yeux et les poumons et sont particulièrement dangereuses pour les enfants, les personnes âgées et les femmes enceintes.',
      'Les cendres polluent aussi le sol et l’eau. La meilleure solution reste de stocker ces déchets dans un sac fermé jusqu’à leur collecte.'
    ),
    image: '/images/festival-environnement-2.jpg',
    createdAt: daysAgo(8),
  },
];

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI manquant (voir .env)');
  await mongoose.connect(process.env.MONGODB_URI);
  const count = await Post.countDocuments();
  if (count > 0) {
    console.log(`La rubrique contient déjà ${count} article(s) : rien n'a été ajouté.`);
  } else {
    await Post.insertMany(posts.map((p) => ({ ...p, demo: true, updatedAt: p.createdAt })), { timestamps: false });
    console.log(`${posts.length} articles d'exemple ajoutés.`);
  }
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Échec :', err.message);
  process.exit(1);
});
