// Photos sous licence libre (Wikimedia Commons). Les crédits doivent rester affichés
// pour respecter les licences CC BY / CC BY-SA.
export const PHOTOS = {
  hotelDeVille: {
    src: '/images/hotel-de-ville-bangui.jpg',
    place: 'Hôtel de ville de Bangui',
    author: 'Auteur inconnu',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:H%C3%B4tel_de_ville_de_Bangui.jpg',
  },
  cantonnier: {
    src: '/images/marche-cantonnier.jpg',
    place: 'Marché de Cantonnier',
    caption: { fr: 'Déchets éparpillés aux abords du marché', en: 'Waste scattered around the market', sg: 'Yê tî sioni na tërë tî gala' },
    author: 'CorbeauNews',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Cantonnier_market.jpg',
  },
  landja: {
    src: '/images/inondation-landja.jpg',
    place: 'Quartier Landja',
    caption: { fr: 'Inondation et débris après de fortes pluies', en: 'Flooding and debris after heavy rain', sg: 'Ngû amû ândo na pekô tî ngû-nzapä' },
    author: 'Zakalingba',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Inondation_quartier_landja_Bangui.jpg',
  },
  kodjo: {
    src: '/images/inondation-kodjo.jpg',
    place: 'Quartier Kodjo',
    caption: { fr: 'Eaux stagnantes : caniveaux obstrués', en: 'Stagnant water: blocked drains', sg: 'Ngû alütï : akaniveau akânga' },
    author: 'Zakalingba',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Inondation_quartier_kodjo_9%C3%A8_arrondissement_de_Bangui.jpg',
  },
  kodjo2: {
    src: '/images/inondation-kodjo-2.jpg',
    place: 'Quartier Kodjo',
    caption: { fr: 'Saison des pluies : habitations menacées', en: 'Rainy season: homes at risk', sg: 'Ngoi tî ngû-nzapä : ada ayeke na kpälë' },
    author: 'Zakalingba',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Inondation_quartier_kodjo_Bangui_RCA.jpg',
  },
  festival1: {
    src: '/images/festival-environnement-1.jpg',
    place: 'Festival pour l’environnement',
    caption: { fr: 'Projection d’un documentaire sur les déchets', en: 'Screening of a documentary on waste' },
    author: 'Zakalingba',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Projection_d%E2%80%99un_film_documentaire_sur_les_d%C3%A9chets_001.jpg',
  },
  festival2: {
    src: '/images/festival-environnement-2.jpg',
    place: 'Festival pour l’environnement',
    caption: { fr: 'Sensibiliser par l’image', en: 'Raising awareness through images' },
    author: 'Zakalingba',
    license: 'CC0',
    source: 'https://commons.wikimedia.org/wiki/File:Projection_d%E2%80%99un_film_documentaire_sur_les_d%C3%A9chets.jpg',
  },
  centre: {
    src: '/images/bangui-centre.jpg',
    place: 'Centre-ville, rond-point PK0',
    caption: { fr: 'Bangui « la Coquette », au bord de l’Oubangui', en: 'Bangui “la Coquette”, on the Ubangi river', sg: 'Bangui « la Coquette », na tërë tî Ubangi' },
    author: 'Alllexxxis',
    license: 'CC BY-SA 4.0',
    source: 'https://commons.wikimedia.org/wiki/File:Bangui_Centre.jpg',
  },
};

// Galerie de l'accueil « Bangui la Coquette » : photos fournies par le porteur du projet
// (droits d'utilisation à vérifier avant mise en ligne). Le sango retombe sur le français.
export const CITY_GALLERY = [
  {
    key: 'centre-ville',
    src: '/images/bangui-centre-ville.jpg',
    place: 'Centre-ville',
    title: { fr: 'Un centre-ville vivant et moderne', en: 'A lively, modern city centre' },
    text: {
      fr: 'Immeubles neufs, commerces animés et avenues dégagées : le cœur de Bangui se transforme.',
      en: 'New buildings, busy shops and clear avenues: the heart of Bangui is changing.',
    },
  },
  {
    key: 'ville-fleurie',
    src: '/images/bangui-ville-fleurie.jpg',
    place: 'Centre-ville',
    title: { fr: '« Bangui la Coquette, ville fleurie »', en: '“Bangui la Coquette, city of flowers”' },
    text: {
      fr: 'Pelouses, bordures repeintes et devise « Le travail, unique voie du développement » : un espace public soigné.',
      en: 'Lawns, freshly painted kerbs and the motto “Work, the only path to development”: a well-kept public space.',
    },
  },
  {
    key: 'rond-point-boganda',
    src: '/images/rond-point-boganda.jpg',
    place: 'Rond-point Barthélemy Boganda',
    title: { fr: 'Un rond-point fleuri et entretenu', en: 'A well-kept roundabout in bloom' },
    text: {
      fr: 'Massifs taillés et gazon vert autour du monument aux armes de la Ville de Bangui.',
      en: 'Trimmed shrubs and green grass around the monument bearing the City of Bangui’s arms.',
    },
  },
  {
    key: 'rond-point',
    src: '/images/bangui-rond-point.jpg',
    place: 'Centre-ville',
    title: { fr: 'Des espaces verts au cœur de la ville', en: 'Green spaces in the heart of the city' },
    text: {
      fr: 'Ronds-points gazonnés et bordures rouge et blanc accompagnent la circulation.',
      en: 'Grassy roundabouts and red-and-white kerbs line the traffic.',
    },
  },
  {
    key: 'tradex',
    src: '/images/rond-point-tradex.webp',
    place: 'Rond-point Tradex',
    title: { fr: 'Une ville qui grandit', en: 'A growing city' },
    text: {
      fr: 'Nouvelles tours et grands axes : Bangui se modernise, gardons-la propre.',
      en: 'New towers and wide roads: Bangui is modernising, let’s keep it clean.',
    },
  },
];
