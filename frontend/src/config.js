// Coordonnées de contact affichées sur le site.
// L'adresse e-mail est PROVISOIRE : à remplacer par l'adresse officielle de la Mairie.
export const CONTACT = {
  email: 'nbamandji@gmail.com',
  address: ['Hôtel de ville de Bangui', 'BP 789', 'Bangui, République centrafricaine'],
};

// Position de l'Hôtel de ville de Bangui (source : Wikidata Q131416919).
export const CITY_HALL = { lat: 4.363589, lng: 18.58356 };

const q = `${CITY_HALL.lat},${CITY_HALL.lng}`;

export const MAPS = {
  // Intégration Google Maps sans clé d'API.
  embed: (lang) => `https://maps.google.com/maps?q=${q}&hl=${lang === 'en' ? 'en' : 'fr'}&z=17&output=embed`,
  open: `https://www.google.com/maps/search/?api=1&query=${q}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
};
