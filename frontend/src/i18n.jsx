import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const messages = {
  fr: {
    'app.subtitle': 'Plateforme citoyenne de salubrité',
    'app.mockBanner':
      'Mode démo : les signalements et articles affichés sont des exemples enregistrés dans votre navigateur. Clé agent de démonstration : demo',
    'lang.label': 'Langue',

    'nav.home': 'Accueil',
    'nav.reports': 'Signalements',
    'nav.gallery': 'Bangui en images',
    'nav.news': 'Sensibilisation & actualités',
    'nav.menu': 'Ouvrir le menu',
    'nav.skip': 'Aller au contenu',
    'nav.contact': 'Contact',
    'contact.eyebrow': 'Contact',
    'contact.title': 'Contactez la Mairie',
    'contact.lead': 'Une question, une suggestion ou une demande de partenariat ? Écrivez-nous, ou rendez-nous visite à l’Hôtel de ville.',
    'contact.formTitle': 'Envoyer un message',
    'contact.formLead': 'Nous vous répondrons par e-mail.',
    'contact.name': 'Nom complet',
    'contact.namePh': 'Votre nom et prénom',
    'contact.phone': 'Téléphone (facultatif)',
    'contact.email': 'Adresse e-mail',
    'contact.emailPh': 'vous@exemple.com',
    'contact.subject': 'Objet',
    'contact.s.signalement': 'Signalement',
    'contact.s.suggestion': 'Suggestion',
    'contact.s.partenariat': 'Partenariat',
    'contact.s.presse': 'Presse / médias',
    'contact.s.autre': 'Autre',
    'contact.message': 'Message',
    'contact.messagePh': 'Écrivez votre message…',
    'contact.submit': 'Envoyer le message',
    'contact.success': 'Message envoyé. Merci, nous vous répondrons rapidement.',
    'contact.successDemo':
      'Mode démo : votre message est enregistré dans ce navigateur mais n’a pas été envoyé. Pour joindre la Mairie, écrivez à l’adresse e-mail indiquée.',
    'contact.address': 'Adresse',
    'contact.emailLabel': 'E-mail',
    'contact.mapTitle': 'Plan d’accès',
    'contact.mapFrame': 'Carte Google Maps : Hôtel de ville de Bangui',
    'contact.openMaps': 'Ouvrir dans Google Maps',
    'contact.directions': 'Itinéraire',
    'err.invalidContact': 'Vérifiez les champs : nom (2 caractères minimum), e-mail valide, message (10 caractères minimum).',
    'nav.close': 'Fermer',

    'ticker.label': 'Flash info',

    'hero.eyebrow': 'Ville de Bangui · République centrafricaine',
    'hero.title': 'Redonnons à Bangui son surnom de',
    'hero.titleHl': '« la Coquette »',
    'hero.lead':
      'Signalez les dépôts d’ordures, les caniveaux bouchés et les zones insalubres de votre quartier. Chaque signalement est suivi jusqu’à sa résolution.',
    'hero.cta': 'Faire un signalement',
    'hero.secondary': 'Actualités de la Mairie',
    'hero.photo': 'Hôtel de ville de Bangui',

    'stats.label': 'Statistiques des signalements',
    'stats.total': 'Signalements',
    'stats.rate': '{n} % résolus',

    'status.signale': 'Signalé',
    'status.en_cours': 'En cours',
    'status.resolu': 'Résolu',

    'cat.depot_sauvage': 'Dépôt sauvage',
    'cat.plastique': 'Plastique / caniveau',
    'cat.organique': 'Déchets organiques',
    'cat.encombrants': 'Encombrants',
    'cat.autre': 'Autre',

    'form.title': 'Nouveau signalement',
    'form.subtitle': 'Moins d’une minute pour agir.',
    'form.titleField': 'Titre',
    'form.titlePh': 'Ex. : Ordures devant le marché',
    'form.neighborhood': 'Quartier',
    'form.neighborhoodPh': 'Ex. : Boy-Rabe, Lakouanga, PK5…',
    'form.category': 'Catégorie',
    'form.description': 'Description',
    'form.descriptionPh': 'Décrivez le problème : volume, depuis quand, emplacement précis…',
    'form.photo': 'Photo (facultatif)',
    'form.photoAdd': 'Ajouter une photo',
    'form.photoHint': 'Prise sur le moment ou depuis la galerie',
    'form.photoRemove': 'Retirer la photo',
    'form.submit': 'Envoyer le signalement',
    'form.sending': 'Envoi…',
    'form.success': 'Signalement envoyé. Merci pour Bangui !',

    'list.eyebrow': 'Suivi en temps réel',
    'list.title': 'Signalements',
    'list.filter': 'Filtrer par statut',
    'list.all': 'Tous',
    'list.empty': 'Aucun signalement pour le moment.',
    'list.changeStatus': 'Changer le statut',
    'list.agentHint': 'Connectez-vous à l’espace agent pour mettre à jour les statuts.',

    'gallery.eyebrow': 'Bangui la Coquette',
    'gallery.title': 'Une ville propre et accueillante',
    'gallery.lead':
      'Places fleuries, ronds-points entretenus, avenues modernes : Bangui a de quoi être fière. Ensemble, gardons-la ainsi.',

    'news.eyebrow': 'Sensibilisation',
    'news.title': 'Actualités de la Mairie',
    'news.lead': 'Flash info, annonces, conseils pratiques et campagnes de sensibilisation publiés par la Mairie de Bangui.',
    'news.all': 'Toutes les actualités',
    'news.read': 'Lire l’article',
    'news.empty': 'Aucun article dans cette rubrique pour le moment.',
    'news.publish': 'Publier un article',
    'news.back': 'Retour aux actualités',
    'news.related': 'À lire aussi',
    'news.by': 'Par',
    'news.share': 'Copier le lien',
    'news.copied': 'Lien copié !',
    'news.delete': 'Supprimer l’article',
    'news.deleteConfirm': 'Cliquez à nouveau pour confirmer',
    'news.demo': 'Exemple',
    'news.featured': 'À la une',
    'news.minRead': '{n} min de lecture',
    'news.allCats': 'Toutes',
    'news.notFound': 'Cet article n’existe pas ou a été supprimé.',
    'news.notFoundTitle': 'Article introuvable',

    'postcat.flash': 'Flash info',
    'postcat.annonce': 'Annonce',
    'postcat.sensibilisation': 'Sensibilisation',
    'postcat.conseil': 'Conseil pratique',
    'postcat.evenement': 'Événement',

    'editor.title': 'Nouvel article',
    'editor.lead': 'Publié au nom de la Mairie de Bangui.',
    'editor.titleField': 'Titre',
    'editor.titlePh': 'Ex. : Journée de salubrité ce samedi',
    'editor.category': 'Rubrique',
    'editor.excerpt': 'Chapeau (résumé)',
    'editor.excerptPh': 'Une ou deux phrases qui résument l’information.',
    'editor.content': 'Contenu',
    'editor.contentPh': 'Rédigez l’article. Laissez une ligne vide entre deux paragraphes.',
    'editor.image': 'Image de couverture',
    'editor.upload': 'Importer une image',
    'editor.library': 'Ou choisir dans la photothèque :',
    'editor.breaking': 'Afficher dans le bandeau « Flash info »',
    'editor.submit': 'Publier',
    'editor.publishing': 'Publication…',
    'editor.cancel': 'Annuler',

    'agent.button': 'Espace agent',
    'agent.title': 'Espace agent',
    'agent.lead': 'Réservé au personnel de la Mairie : mise à jour des signalements et publication des actualités.',
    'agent.key': 'Clé agent',
    'agent.login': 'Se connecter',
    'agent.logout': 'Se déconnecter',
    'agent.connected': 'Agent connecté',

    'footer.about':
      'Plateforme citoyenne de signalement des déchets et de sensibilisation à la salubrité, proposée à la Mairie de Bangui.',
    'footer.nav': 'Navigation',
    'footer.credits': 'Crédits photos',
    'footer.creditsText':
      'Photos issues de Wikimedia Commons, sous licences CC0 et CC BY-SA 4.0. Auteurs : Zakalingba, CorbeauNews, Alllexxxis et auteur inconnu (Hôtel de ville).',
    'footer.rights': 'Tous droits réservés.',
    'footer.madeBy': 'Conçu et développé par',

    'err.invalid':
      'Données invalides. Vérifiez les champs (titre : 3 caractères minimum, description : 5, quartier : 2).',
    'err.unauthorized': 'Clé agent invalide.',
    'err.notFound': 'Élément introuvable.',
    'err.tooLarge': 'Photo trop volumineuse ou espace de stockage plein.',
    'err.tooMany': 'Trop de tentatives. Patientez quelques minutes avant de réessayer.',
    'err.image': 'Impossible de lire cette image.',
    'err.network': 'Impossible de joindre le serveur.',
    'err.generic': 'Une erreur est survenue.',
  },
  en: {
    'app.subtitle': 'Citizen cleanliness platform',
    'app.mockBanner':
      'Demo mode: the reports and articles shown are examples stored in your browser. Demo agent key: demo',
    'lang.label': 'Language',

    'nav.home': 'Home',
    'nav.reports': 'Reports',
    'nav.gallery': 'Bangui in pictures',
    'nav.news': 'Awareness & news',
    'nav.menu': 'Open menu',
    'nav.skip': 'Skip to content',
    'nav.contact': 'Contact',
    'contact.eyebrow': 'Contact',
    'contact.title': 'Contact City Hall',
    'contact.lead': 'A question, a suggestion or a partnership request? Write to us, or visit us at City Hall.',
    'contact.formTitle': 'Send a message',
    'contact.formLead': 'We will reply by email.',
    'contact.name': 'Full name',
    'contact.namePh': 'Your first and last name',
    'contact.phone': 'Phone (optional)',
    'contact.email': 'Email address',
    'contact.emailPh': 'you@example.com',
    'contact.subject': 'Subject',
    'contact.s.signalement': 'Report',
    'contact.s.suggestion': 'Suggestion',
    'contact.s.partenariat': 'Partnership',
    'contact.s.presse': 'Press / media',
    'contact.s.autre': 'Other',
    'contact.message': 'Message',
    'contact.messagePh': 'Write your message…',
    'contact.submit': 'Send message',
    'contact.success': 'Message sent. Thank you, we will reply soon.',
    'contact.successDemo':
      'Demo mode: your message is stored in this browser but has not been sent. To reach City Hall, write to the email address shown.',
    'contact.address': 'Address',
    'contact.emailLabel': 'Email',
    'contact.mapTitle': 'How to get here',
    'contact.mapFrame': 'Google Maps: Bangui City Hall',
    'contact.openMaps': 'Open in Google Maps',
    'contact.directions': 'Directions',
    'err.invalidContact': 'Check the fields: name (at least 2 characters), valid email, message (at least 10 characters).',
    'nav.close': 'Close',

    'ticker.label': 'Breaking',

    'hero.eyebrow': 'City of Bangui · Central African Republic',
    'hero.title': 'Let’s make Bangui live up to its name',
    'hero.titleHl': '“la Coquette”',
    'hero.lead':
      'Report rubbish dumps, blocked drains and unsanitary spots in your neighbourhood. Every report is followed until it is resolved.',
    'hero.cta': 'Report an issue',
    'hero.secondary': 'City Hall news',
    'hero.photo': 'Bangui City Hall',

    'stats.label': 'Report statistics',
    'stats.total': 'Reports',
    'stats.rate': '{n}% resolved',

    'status.signale': 'Reported',
    'status.en_cours': 'In progress',
    'status.resolu': 'Resolved',

    'cat.depot_sauvage': 'Illegal dumping',
    'cat.plastique': 'Plastic / drain',
    'cat.organique': 'Organic waste',
    'cat.encombrants': 'Bulky items',
    'cat.autre': 'Other',

    'form.title': 'New report',
    'form.subtitle': 'Takes less than a minute.',
    'form.titleField': 'Title',
    'form.titlePh': 'e.g. Rubbish in front of the market',
    'form.neighborhood': 'Neighbourhood',
    'form.neighborhoodPh': 'e.g. Boy-Rabe, Lakouanga, PK5…',
    'form.category': 'Category',
    'form.description': 'Description',
    'form.descriptionPh': 'Describe the problem: amount, since when, exact location…',
    'form.photo': 'Photo (optional)',
    'form.photoAdd': 'Add a photo',
    'form.photoHint': 'Take one now or pick from your gallery',
    'form.photoRemove': 'Remove photo',
    'form.submit': 'Send report',
    'form.sending': 'Sending…',
    'form.success': 'Report sent. Thank you for Bangui!',

    'list.eyebrow': 'Live tracking',
    'list.title': 'Reports',
    'list.filter': 'Filter by status',
    'list.all': 'All',
    'list.empty': 'No reports yet.',
    'list.changeStatus': 'Change status',
    'list.agentHint': 'Sign in to the agent area to update statuses.',

    'gallery.eyebrow': 'Bangui la Coquette',
    'gallery.title': 'A clean and welcoming city',
    'gallery.lead':
      'Flowered squares, well-kept roundabouts, modern avenues: Bangui has a lot to be proud of. Together, let’s keep it that way.',

    'news.eyebrow': 'Awareness',
    'news.title': 'City Hall news',
    'news.lead': 'Breaking news, announcements, practical tips and awareness campaigns published by Bangui City Hall.',
    'news.all': 'All news',
    'news.read': 'Read article',
    'news.empty': 'No articles in this section yet.',
    'news.publish': 'Publish an article',
    'news.back': 'Back to news',
    'news.related': 'Read also',
    'news.by': 'By',
    'news.share': 'Copy link',
    'news.copied': 'Link copied!',
    'news.delete': 'Delete article',
    'news.deleteConfirm': 'Click again to confirm',
    'news.demo': 'Example',
    'news.featured': 'Featured',
    'news.minRead': '{n} min read',
    'news.allCats': 'All',
    'news.notFound': 'This article does not exist or has been deleted.',
    'news.notFoundTitle': 'Article not found',

    'postcat.flash': 'Breaking news',
    'postcat.annonce': 'Announcement',
    'postcat.sensibilisation': 'Awareness',
    'postcat.conseil': 'Practical tip',
    'postcat.evenement': 'Event',

    'editor.title': 'New article',
    'editor.lead': 'Published on behalf of Bangui City Hall.',
    'editor.titleField': 'Title',
    'editor.titlePh': 'e.g. Clean-up day this Saturday',
    'editor.category': 'Section',
    'editor.excerpt': 'Summary',
    'editor.excerptPh': 'One or two sentences summing up the news.',
    'editor.content': 'Content',
    'editor.contentPh': 'Write the article. Leave a blank line between paragraphs.',
    'editor.image': 'Cover image',
    'editor.upload': 'Upload an image',
    'editor.library': 'Or pick from the photo library:',
    'editor.breaking': 'Show in the “Breaking” banner',
    'editor.submit': 'Publish',
    'editor.publishing': 'Publishing…',
    'editor.cancel': 'Cancel',

    'agent.button': 'Agent area',
    'agent.title': 'Agent area',
    'agent.lead': 'For City Hall staff only: update report statuses and publish news.',
    'agent.key': 'Agent key',
    'agent.login': 'Sign in',
    'agent.logout': 'Sign out',
    'agent.connected': 'Agent signed in',

    'footer.about':
      'Citizen platform for reporting waste and raising awareness about cleanliness, offered to Bangui City Hall.',
    'footer.nav': 'Navigation',
    'footer.credits': 'Photo credits',
    'footer.creditsText':
      'Photos from Wikimedia Commons, under CC0 and CC BY-SA 4.0 licences. Authors: Zakalingba, CorbeauNews, Alllexxxis and unknown author (City Hall).',
    'footer.rights': 'All rights reserved.',
    'footer.madeBy': 'Designed and built by',

    'err.invalid':
      'Invalid data. Check the fields (title: at least 3 characters, description: 5, neighbourhood: 2).',
    'err.unauthorized': 'Invalid agent key.',
    'err.notFound': 'Item not found.',
    'err.tooLarge': 'Photo too large or storage full.',
    'err.tooMany': 'Too many attempts. Please wait a few minutes and try again.',
    'err.image': 'This image cannot be read.',
    'err.network': 'Cannot reach the server.',
    'err.generic': 'Something went wrong.',
  },

  // Sango : premier jet, À FAIRE RELIRE par un locuteur natif avant toute mise en ligne.
  // Toute clé absente s'affiche en français (voir la fonction t plus bas).
  sg: {
    'app.subtitle': 'Ë bata Bangui nzönî',
    'app.mockBanner':
      'Démo : ayê so a fa na asango so mo bâ ayeke tapande, a bata ni na yâ tî navigateur tî mo. Clé tî wakua tî tapande : demo',
    'lang.label': 'Yângâ',

    'nav.home': 'Da',
    'nav.reports': 'Ayê so a fa',
    'nav.gallery': 'Bangui na yâ tî afoto',
    'nav.news': 'Zîngo li & asango',
    'nav.menu': 'Zî menu',
    'nav.close': 'Kânga',
    'nav.skip': 'Gue na yâ ni',
    'contact.title': 'Tokua sango na Mairie',
    'contact.formTitle': 'Tokua mbênî sango',
    'contact.name': 'Ïrï tî mo',
    'contact.namePh': 'Ïrï tî mo kûê',
    'contact.subject': 'Ndâ tî sango',
    'contact.s.autre': 'Mbênî ye nde',
    'contact.message': 'Sango tî mo',
    'contact.messagePh': 'Sû sango tî mo…',
    'contact.submit': 'Tokua sango',
    'contact.success': 'A tokua sango awe. Singîla mîngi !',
    'contact.mapTitle': 'Lêgë tî gue na Mairie',
    'contact.directions': 'Lêgë',

    'ticker.label': 'Sango tî fadeso',

    'hero.eyebrow': 'Kodro tî Bangui · Ködörösêse tî Bêafrîka',
    'hero.title': 'Zîa ë kîri na Bangui ïrï tî lo',
    'hero.titleHl': '« la Coquette »',
    'hero.lead':
      'Fa ândo tî yê tî sioni, akaniveau so akânga na ândo so ayeke nzönî pëpe na yâ tî quartier tî mo. Awakua ayeke bâ ye ôko ôko jusqu’à a leke ni.',
    'hero.cta': 'Fa mbênî ye',
    'hero.secondary': 'Asango tî Mairie',
    'hero.photo': 'Mairie tî Bangui',

    'stats.label': 'Âchiffre tî ayê so a fa',
    'stats.total': 'Ayê so a fa',
    'stats.rate': '{n} % a leke awe',

    'status.signale': 'A fa awe',
    'status.en_cours': 'Kua ayeke na lêgë',
    'status.resolu': 'A leke awe',

    'cat.depot_sauvage': 'Tûkûngö yê sêngê',
    'cat.plastique': 'Plastiki / kaniveau',
    'cat.organique': 'Yê tî kôbe',
    'cat.encombrants': 'Kotä yê',
    'cat.autre': 'Mbênî ye nde',

    'form.title': 'Fa mbênî ye',
    'form.subtitle': 'A yeke mû ngoi kêtê.',
    'form.titleField': 'Ïrï tî tënë',
    'form.titlePh': 'Tapande : Yê tî sioni na gbele tî gala',
    'form.neighborhood': 'Quartier',
    'form.neighborhoodPh': 'Tapande : Boy-Rabe, Lakouanga, PK5…',
    'form.category': 'Marä tî ye',
    'form.description': 'Tënë tî ye ni',
    'form.descriptionPh': 'Fa tënë ni : kotä tî ni, ngoi wa a löndö, ndo ni kâ…',
    'form.photo': 'Foto (a yeke ngangu pëpe)',
    'form.photoAdd': 'Zîa mbênî foto',
    'form.photoHint': 'Gbû foto fadeso wala mû ni na yâ tî galerie',
    'form.photoRemove': 'Zî foto ni',
    'form.submit': 'Tokua',
    'form.sending': 'A yeke tokua…',
    'form.success': 'A tokua awe. Singîla mîngi tî Bangui !',

    'list.eyebrow': 'Bängö kua fadeso',
    'list.title': 'Ayê so a fa',
    'list.filter': 'Soro marä',
    'list.all': 'Kûê',
    'list.empty': 'Mbênî ye ayeke dä pëpe fadeso.',
    'list.changeStatus': 'Gbian ndo tî ye ni',
    'list.agentHint': 'Lï na Ndo tî awakua tî gbian ndo tî ayê.',

    'gallery.eyebrow': 'Bangui la Coquette',
    'gallery.title': 'Kodro so ayeke nzönî na pendere',
    'gallery.lead': 'Ândo so a leke nzönî, alêgë so ayeke fini : Bangui ayeke pendere. Ë bata lo kûê.',

    'news.eyebrow': 'Zîngo li',
    'news.title': 'Asango tî Mairie',
    'news.lead': 'Sango tî fadeso, tënë tî hînga, wängö na kua tî zîngo li so Mairie tî Bangui asigîgî na ni.',
    'news.all': 'Asango kûê',
    'news.read': 'Diko tënë ni',
    'news.empty': 'Sango ayeke dä pëpe fadeso.',
    'news.publish': 'Tokua mbênî sango',
    'news.back': 'Kîri na asango',
    'news.related': 'Diko ngâ',
    'news.by': 'Wasû :',
    'news.share': 'Mû lien',
    'news.copied': 'A mû lien awe !',
    'news.delete': 'Zî sango ni',
    'news.deleteConfirm': 'Pusu ni ngâ tî zî ni',
    'news.demo': 'Tapande',
    'news.featured': 'Kotä sango',
    'news.minRead': 'Diko na yâ tî {n} mn',
    'news.allCats': 'Kûê',
    'news.notFound': 'Sango so ayeke dä pëpe wala a zî ni awe.',
    'news.notFoundTitle': 'A wara sango ni pëpe',

    'postcat.flash': 'Sango tî fadeso',
    'postcat.annonce': 'Tënë tî hînga',
    'postcat.sensibilisation': 'Zîngo li',
    'postcat.conseil': 'Wängö',
    'postcat.evenement': 'Matânga',

    'editor.title': 'Fini sango',
    'editor.lead': 'A tokua ni na ïrï tî Mairie tî Bangui.',
    'editor.titleField': 'Ïrï tî tënë',
    'editor.titlePh': 'Tapande : Lâ tî sukûla kodro',
    'editor.category': 'Marä',
    'editor.excerpt': 'Tënë na kêtê',
    'editor.excerptPh': 'Tënë ôko wala ûse so afa sango ni.',
    'editor.content': 'Yâ tî sango',
    'editor.contentPh': 'Sû sango ni. Zîa mbênî ndo sêngê na pöpö tî paragraphe ûse.',
    'editor.image': 'Foto tî sango ni',
    'editor.upload': 'Zîa mbênî foto',
    'editor.library': 'Wala soro na yâ tî afoto :',
    'editor.breaking': 'Fa ni na yâ tî « Sango tî fadeso »',
    'editor.submit': 'Tokua na gigi',
    'editor.publishing': 'A yeke tokua…',
    'editor.cancel': 'Zîa ni',

    'agent.button': 'Ndo tî awakua',
    'agent.title': 'Ndo tî awakua',
    'agent.lead': 'Gï tî awakua tî Mairie : tî gbian ndo tî ayê na tî tokua asango.',
    'agent.key': 'Clé tî wakua',
    'agent.login': 'Lï',
    'agent.logout': 'Sigîgî',
    'agent.connected': 'Wakua alï awe',

    'footer.about':
      'Ndo tî azo tî kodro tî fa yê tî sioni na tî zîngo li tî azo na ndö tî nzönî tî kodro, so a mû na Mairie tî Bangui.',
    'footer.nav': 'Lêgë',
    'footer.credits': 'Azo so agbû afoto',
    'footer.creditsText':
      'Afoto alöndö na Wikimedia Commons (licence CC0 na CC BY-SA 4.0). Azo so agbû ni : Zakalingba, CorbeauNews, Alllexxxis na mbênî zo so a hînga ïrï tî lo pëpe (Mairie).',
    'footer.madeBy': 'Azo so aleke ni',

    'err.invalid': 'Tënë ni ayeke nzönî pëpe. Bâ ândo ni (ïrï : 3 lettre, tënë : 5, quartier : 2).',
    'err.unauthorized': 'Clé tî wakua ni ayeke nzönî pëpe.',
    'err.notFound': 'A wara ni pëpe.',
    'err.tooLarge': 'Ndo tî batango ayê asi awe : zî mbênî afoto wala asango.',
    'err.image': 'A lingbi tî diko foto so pëpe.',
    'err.network': 'A lingbi tî wara serveur pëpe.',
    'err.generic': 'Mbênî kpälë asï.',
  },
};

export const LANGS = ['fr', 'sg', 'en'];

// Noms de langue écrits dans leur propre langue (pour les lecteurs d'écran).
export const LANG_NAMES = { fr: 'Français', sg: 'Sängö', en: 'English' };

const I18nContext = createContext(null);

function getInitialLang() {
  try {
    const saved = localStorage.getItem('lang');
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* stockage indisponible */
  }
  const nav = navigator.language?.toLowerCase() || '';
  if (nav.startsWith('sg')) return 'sg';
  return nav.startsWith('en') ? 'en' : 'fr';
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* ignoré */
    }
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      // Les navigateurs ne savent pas formater les dates en sango : on les affiche en français.
      locale: lang === 'en' ? 'en-GB' : 'fr-FR',
      t: (key, vars) => {
        let s = messages[lang][key] ?? messages.fr[key] ?? key;
        if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, v);
        return s;
      },
    }),
    [lang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
