export const RESTAURANT_INFO = {
  name: "Santo Mare",
  subtitle: "Cuisine Côtière · Vins Vivants · Belles Nuits",
  tagline: "Assiettes méditerranéennes à partager, flacons d'artisans et soirées infinies face à la mer.",
  location: "Marseille · Mer Méditerranée · France",
  address: "14 Rue de la Marine, 13002 Marseille",
  coordinates: "43°17’48”N · 5°22’13”E",
  phone: "+33 4 91 00 24 50",
  email: "bonjour@santomare.fr",
  instagram: "@santomare.marseille",
  hours: [
    { days: "Mardi — Jeudi", time: "12h00 — Minuit" },
    { days: "Vendredi — Samedi", time: "12h00 — 01h30" },
    { days: "Dimanche", time: "12h00 — 23h00" },
    { days: "Lundi", time: "Fermé (Retour de pêche)" }
  ],
  footerHoursText: "MAR—JEU 12H—00H · VEN—SAM 12H—01H30 · DIM 12H—23H"
};

export const MENU_CATEGORIES = [
  { id: "all", label: "Toute la Carte", code: "00" },
  { id: "course-01", label: "Pour Commencer", sub: "Antipasti & Petites Assiettes", code: "01" },
  { id: "course-02", label: "De la Cuisine", sub: "Pâtes Fraîches & Poissons", code: "02" },
  { id: "course-03", label: "Pour la Table", sub: "Grandes Pièces & Accompagnements", code: "03" },
  { id: "course-04", label: "Douceurs", sub: "Desserts & Glaces Maison", code: "04" },
  { id: "course-05", label: "Apéritif & Flacons", sub: "Cocktails, Vins Vivants & Café", code: "05" },
];

export const MENU_ITEMS = [
  // --- COURSE 01: POUR COMMENCER ---
  {
    id: "focaccia",
    courseId: "course-01",
    courseName: "Pour Commencer",
    name: "Focaccia Calda au Romarin",
    originalName: "Focaccia",
    description: "Pâte au levain naturel fermentée 48h, romarin sauvage des calanques, fleur de sel de Camargue et huile d'olive vierge extra pressée à froid.",
    price: 7,
    tags: ["Végétarien"],
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 min",
    pairing: "Vermentino di Sardegna"
  },
  {
    id: "olives",
    courseId: "course-01",
    courseName: "Pour Commencer",
    name: "Olives de Sicile Marinées",
    originalName: "Marinated Olives",
    description: "Olives vertes Nocellara et Taggiasche marinées aux zestes d'agrumes confits, graines de fenouil sauvage et pointe de piment doux d'Espelette.",
    price: 6,
    tags: ["Végétalien", "Sans Gluten"],
    image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    prepTime: "Instantané",
    pairing: "Spritz Santo Mare"
  },
  {
    id: "burrata",
    courseId: "course-01",
    courseName: "Pour Commencer",
    name: "Burrata des Pouilles & Pêches Rôties",
    originalName: "Burrata",
    description: "Cœur crémeux de burrata d'Andria, pêches jaunes rôties au feu de bois, basilic pourpre génois, pistaches de Bronte toastées et filet d'huile d'olive fruitée.",
    price: 16,
    isSignature: true,
    tags: ["Signature", "Végétarien"],
    image: "https://framerusercontent.com/images/8awl3xJ35vDNByJkKJ8Rp7csg0.jpg",
    prepTime: "8 min",
    pairing: "Vin Orange de Provence"
  },
  {
    id: "tomato-carpaccio",
    courseId: "course-01",
    courseName: "Pour Commencer",
    name: "Carpaccio de Tomates Anciennes",
    originalName: "Tomato Carpaccio",
    description: "Sélection de tomates de plein champ du Luberon (Cœur de bœuf, Noire de Crimée, Green Zebra), câpres sauvages de Pantelleria, origan sauvage et stracciatella fumée.",
    price: 13,
    tags: ["Végétarien", "Bio"],
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    prepTime: "6 min",
    pairing: "Rosé Nature de Bandol"
  },
  {
    id: "sea-bass-crudo",
    courseId: "course-01",
    courseName: "Pour Commencer",
    name: "Crudo de Loup de Mer au Citron Givré",
    originalName: "Sea Bass Crudo",
    description: "Loup de mer pêché à la ligne le matin même au large de Marseille, fines lamelles de concombre croquant, baies roses concassées, émulsion citron-bergamote.",
    price: 18,
    isSignature: true,
    tags: ["Pêche Locale", "Sans Gluten"],
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 min",
    pairing: "Cassis Blanc de Blancs"
  },
  {
    id: "courgette-flowers",
    courseId: "course-01",
    courseName: "Pour Commencer",
    name: "Fleurs de Courgettes Croustillantes",
    originalName: "Crispy Courgette Flowers",
    description: "Fleurs fraîches de courgettes farcies à la ricotta de brebis fermière, menthe fraîche et zestes de citron de Menton, frites en tempura ultra-légère.",
    price: 15,
    tags: ["Végétarien", "Saisonnier"],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    prepTime: "10 min",
    pairing: "Franciacorta Brut"
  },

  // --- COURSE 02: DE LA CUISINE ---
  {
    id: "rigatoni",
    courseId: "course-02",
    courseName: "De la Cuisine",
    name: "Rigatoni au Piment Doux & Pecorino",
    originalName: "Rigatoni",
    description: "Pâtes tréfilées au bronze, sauce mijotée de tomates San Marzano DOP, piment calabrais infusé à l'huile d'olive, ail doux rôti et pluie généreuse de pecorino romano 18 mois.",
    price: 22,
    isSignature: true,
    tags: ["Signature"],
    image: "https://framerusercontent.com/images/YTHXXyqjHYIAIuakAJEdRUC4nHE.jpg",
    prepTime: "12 min",
    pairing: "Chianti Classico Nature"
  },
  {
    id: "lemon-linguine",
    courseId: "course-02",
    courseName: "De la Cuisine",
    name: "Linguine Émulsionnées au Citron d'Amalfi",
    originalName: "Lemon Linguine",
    description: "Pâtes longues artisanales liées au beurre noisette, jus et zestes rapés de citrons non traités d'Amalfi, crème de parmigiano reggiano 24 mois et poivre blanc de Sarawak.",
    price: 23,
    tags: ["Végétarien"],
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    prepTime: "11 min",
    pairing: "Greco di Tufo"
  },
  {
    id: "clam-spaghetti",
    courseId: "course-02",
    courseName: "De la Cuisine",
    name: "Spaghetti alle Vongole Veraci",
    originalName: "Clam Spaghetti",
    description: "Palourdes sauvages de Méditerranée ouvertes minute au vin blanc sec, ail confit en chemise, persil plat frais haché et jus de coquillages monté à l'huile d'olive.",
    price: 27,
    isSignature: true,
    tags: ["Pêche Locale", "Incontournable"],
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    prepTime: "14 min",
    pairing: "Fiano di Avellino"
  },
  {
    id: "sea-bass",
    courseId: "course-02",
    courseName: "De la Cuisine",
    name: "Bar Côtier Braisé aux Câpres & Fenouil",
    originalName: "Sea Bass",
    description: "Pavé de bar de Méditerranée saisi à la plancha, bulbe de fenouil braisé au jus d'orange sanguine, câpres frites et réduction citronnée à l'origan frais.",
    price: 29,
    isSignature: true,
    tags: ["Signature", "Sans Gluten"],
    image: "https://framerusercontent.com/images/AnAVfDU4QJkEitv3ZU7yufnbT28.jpg",
    prepTime: "15 min",
    pairing: "Vermentino de Corse"
  },
  {
    id: "grilled-octopus",
    courseId: "course-02",
    courseName: "De la Cuisine",
    name: "Poulpe Grillé au Paprika Fumé & Salsa Verde",
    originalName: "Grilled Octopus",
    description: "Tentacule de poulpe de roche confit puis laqué et grillé à la flamme, pommes de terre grenailles écrasées au beurre salé, salsa verde aux herbes du maquis.",
    price: 31,
    tags: ["Spécialité", "Pêche Locale"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    prepTime: "16 min",
    pairing: "Etna Rosso Nature"
  },
  {
    id: "aubergine-parmigiana",
    courseId: "course-02",
    courseName: "De la Cuisine",
    name: "Parmigiana d'Aubergines Gratinée au Feu de Bois",
    originalName: "Aubergine Parmigiana",
    description: "Millefeuille fondant d'aubergines rôties, compotée de tomates San Marzano confites, mozzarella fior di latte filante et basilic frais du potager.",
    price: 24,
    tags: ["Végétarien", "Réconfort"],
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=800&q=80",
    prepTime: "12 min",
    pairing: "Nero d'Avola"
  },

  // --- COURSE 03: POUR LA TABLE (À PARTAGER) ---
  {
    id: "sea-bream-whole",
    courseId: "course-03",
    courseName: "Pour la Table",
    name: "Daurade Royale Sauvage Entière Rôtie (Pour deux)",
    originalName: "Whole Grilled Sea Bream",
    description: "Pièce noble de 800g à 1kg, levée et grillée entière sur braises de sarments de vigne, citron grillé, herbes sauvages, servie avec son plat de grenailles rôties.",
    price: 68,
    isSignature: true,
    tags: ["Pour 2 personnes", "Pêche du Jour"],
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    prepTime: "25 min",
    pairing: "Côtes de Provence Blanc Domaine Richeaume"
  },
  {
    id: "roasted-potatoes",
    courseId: "course-03",
    courseName: "Pour la Table",
    name: "Pommes Grenailles Croustillantes au Romarin",
    originalName: "Roasted Potatoes",
    description: "Petites pommes de terre grenailles confites dans l'huile d'olive, écrasées et dorées à la plancha avec romarin frais et sel croquant de Guérande.",
    price: 7,
    tags: ["Accompagnement", "Végétalien"],
    image: "https://images.unsplash.com/photo-1600850056064-a8b380df8395?auto=format&fit=crop&w=800&q=80",
    prepTime: "8 min"
  },
  {
    id: "green-salad",
    courseId: "course-03",
    courseName: "Pour la Table",
    name: "Salade de Feuilles Amères & Vinaigrette Citron",
    originalName: "Green Salad",
    description: "Roquette sauvage poivrée, trévise rouge croquante, pousses d'épinards, copeaux de parmigiano et vinaigrette vive au citron et miel de lavande.",
    price: 6,
    tags: ["Accompagnement", "Bio"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTime: "5 min"
  },
  {
    id: "charred-vegetables",
    courseId: "course-03",
    courseName: "Pour la Table",
    name: "Légumes de Saison Grillés à la Flamme",
    originalName: "Charred Seasonal Vegetables",
    description: "Artichauts poivrades, courgettes trompettes de Nice, poivrons rouges doux et oignons cebettes saisis au feu, huile d'olive vierge et fleur de thym.",
    price: 8,
    tags: ["Accompagnement", "Végétalien"],
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    prepTime: "9 min"
  },

  // --- COURSE 04: DOUCEURS ---
  {
    id: "tiramisu",
    courseId: "course-04",
    courseName: "Douceurs",
    name: "Tiramisu Signature Santo Mare",
    originalName: "Tiramisu",
    description: "Biscuits savoiardi imbibés d'un espresso d'Éthiopie torréfié à Marseille et d'une larme d'Amaretto d'artisan, crème aérienne au mascarpone frais et cacao grand cru.",
    price: 12,
    isSignature: true,
    tags: ["Signature"],
    image: "https://framerusercontent.com/images/qHV80Is2JgJqVCW1QUvKP46rzM.jpg",
    prepTime: "Prêt à servir",
    pairing: "Marsala Superiore"
  },
  {
    id: "lemon-olive-oil-cake",
    courseId: "course-04",
    courseName: "Douceurs",
    name: "Gâteau Moelleux à l'Huile d'Olive & Citron",
    originalName: "Lemon Olive Oil Cake",
    description: "Moelleux toscan traditionnel imbibé de sirop de citrons de Menton, cuillère de crème fraîche épaisse crue et zestes d'agrumes confits.",
    price: 11,
    tags: ["Classique"],
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80",
    prepTime: "Prêt à servir"
  },
  {
    id: "panna-cotta",
    courseId: "course-04",
    courseName: "Douceurs",
    name: "Panna Cotta à la Vanille Bourbon & Fruits Rouges",
    originalName: "Panna Cotta",
    description: "Crème vanillée onctueuse aux gousses de Madagascar, compotée minute de figues fraîches rôties ou coulis de fruits rouges du pays selon arrivage.",
    price: 10,
    tags: ["Sans Gluten"],
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80",
    prepTime: "Prêt à servir"
  },
  {
    id: "affogato",
    courseId: "course-04",
    courseName: "Douceurs",
    name: "Affogato al Caffè & Gelato Fior di Latte",
    originalName: "Affogato",
    description: "Boule de glace artisanale à la fleur de lait, noyée minute sous un double espresso chaud serré torréfié en Provence.",
    price: 8,
    tags: ["Glace Artisanale"],
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 min"
  },
  {
    id: "sorbet",
    courseId: "course-04",
    courseName: "Douceurs",
    name: "Duo de Sorbets Artisanaux Plein Fruit",
    originalName: "Seasonal Sorbet",
    description: "Deux boules de sorbet turbiné maison : Citron de Menton & Basilic frais, Pêche de vigne de Provence ou Figue rôtie.",
    price: 8,
    tags: ["Végétalien", "Sans Gluten"],
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80",
    prepTime: "Prêt à servir"
  },

  // --- COURSE 05: APERITIVO & BOISSONS ---
  {
    id: "santo-spritz",
    courseId: "course-05",
    courseName: "Apéritif & Flacons",
    name: "Santo Spritz Côtière",
    originalName: "Santo Spritz",
    description: "Bitter italien artisanal Select, Prosecco Superiore DOCG di Valdobbiadene, trait d'eau gazeuse, quartier d'orange sanguine et grande olive verte.",
    price: 14,
    isSignature: true,
    tags: ["Cocktail Maison"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 min"
  },
  {
    id: "classic-negroni",
    courseId: "course-05",
    courseName: "Apéritif & Flacons",
    name: "Negroni Classique de la Maison",
    originalName: "Classic Negroni",
    description: "Gin artisanal infusé au romarin, Campari bitter d'époque, Vermouth rouge Carpano Antica Formula et zeste d'orange séché.",
    price: 15,
    isSignature: true,
    tags: ["Classique Italien"],
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 min"
  },
  {
    id: "peach-bellini",
    courseId: "course-05",
    courseName: "Apéritif & Flacons",
    name: "Bellini à la Pêche Blanche de Provence",
    originalName: "Peach Bellini",
    description: "Purée maison de pêches blanches fraîches, trait de liqueur de framboise sauvage et Prosecco brut bien frappé.",
    price: 13,
    tags: ["Cocktail Doux"],
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
    prepTime: "3 min"
  },
  {
    id: "basil-lemonade",
    courseId: "course-05",
    courseName: "Apéritif & Flacons",
    name: "Limonade Artisanale au Basilic Frais (Sans Alcool)",
    originalName: "Basil Lemonade",
    description: "Jus de citron jaune pressé le matin, sirop léger de basilic frais infusé à froid, eau pétillante et glaçons cristallins.",
    price: 9,
    tags: ["Sans Alcool", "Maison"],
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    prepTime: "2 min"
  },
  {
    id: "specialty-coffee",
    courseId: "course-05",
    courseName: "Apéritif & Flacons",
    name: "Espresso / Double Espresso de Spécialité",
    originalName: "Espresso / Double Espresso",
    description: "Sélection de café de terroir éthiopien, torréfié artisanalement dans le quartier du Panier à Marseille. Notes d'agrumes et de cacao.",
    price: 4,
    tags: ["Café Bio"],
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    prepTime: "2 min"
  }
];

export const SIGNATURE_DISHES = [
  {
    number: "01",
    name: "Burrata",
    desc: "Pêche · Basilic sauvage · Huile d'olive fruitée",
    price: "16 €",
    cutoutImage: "https://framerusercontent.com/images/U0xJmmq4bKlWksdIo2LbIWLpMSA.png",
    fullImage: "https://framerusercontent.com/images/8awl3xJ35vDNByJkKJ8Rp7csg0.jpg",
    details: "Un classique revisité avec des pêches de la vallée du Rhône rôties minute et un basilic génois cueilli le matin."
  },
  {
    number: "02",
    name: "Loup de Mer",
    desc: "Citron · Fenouil sauvage · Câpres de Pantelleria",
    price: "29 €",
    cutoutImage: "https://framerusercontent.com/images/p3aQqZIwUsDlweqwqw4rCgCQDJw.png",
    fullImage: "https://framerusercontent.com/images/AnAVfDU4QJkEitv3ZU7yufnbT28.jpg",
    details: "Pêche de petite ligne marseillaise, saisie à feu vif, peau croustillante et chair nacrée délicatement parfumée."
  },
  {
    number: "03",
    name: "Rigatoni",
    desc: "Tomates confites · Piment doux · Pecorino Romano",
    price: "22 €",
    cutoutImage: "https://framerusercontent.com/images/KdVq1u5uB6EryWZN8IczSGqs.png",
    fullImage: "https://framerusercontent.com/images/YTHXXyqjHYIAIuakAJEdRUC4nHE.jpg",
    details: "Pâtes artisanales fraîches, tréfilées au bronze pour accrocher une sauce mijotée 6 heures avec amour."
  },
  {
    number: "04",
    name: "Tiramisu",
    desc: "Espresso serré · Mascarpone des Alpes · Cacao pur",
    price: "12 €",
    cutoutImage: "https://framerusercontent.com/images/UhTFnDlEWEN5l9Eh7VjFNoxFNg.png",
    fullImage: "https://framerusercontent.com/images/qHV80Is2JgJqVCW1QUvKP46rzM.jpg",
    details: "La recette familiale vénitienne, montée minute, crémeuse et légère avec un biscuit généreusement imbibé."
  }
];

export const ATMOSPHERE_MOODS = [
  {
    id: "daylight",
    title: "12:00 / La Terrasse au Soleil",
    subtitle: "Laissez l'après-midi prendre tout son temps.",
    tag: "Midi & Soleil",
    description: "Le soleil dore les parasols en toile écrue, le clapotis de l'eau accompagne l'ouverture de la première bouteille fraîche de blanc de Cassis, les assiettes de crudo et de focaccia tournent entre les mains des convives.",
    image: "https://framerusercontent.com/images/RRoHvHTdVxFj4g9DsYvsqXzHgSg.jpg"
  },
  {
    id: "dinner",
    title: "20:00 / Le Dîner aux Chandelles",
    subtitle: "Le crépuscule sur le port, les tablées chaleureuses.",
    tag: "Dîner Convivial",
    description: "Le ciel passe de l'oranger au bleu cobalt. Les bougies s'allument sur les tables en chêne ciré. Les parfums de poissons braisés, de pâtes au piment et de vin orange emplissent la salle chaleureuse.",
    image: "https://framerusercontent.com/images/F1t4oDaZdYwIwacFgVaHJNHCuIw.jpg"
  },
  {
    id: "afterdark",
    title: "22:30 / Tard le Soir & DJ Set",
    subtitle: "Vins vivants, fenêtres grandes ouvertes et musique feutrée.",
    tag: "Nuit & Musique",
    description: "On ne regarde plus l'heure. Le barman prépare les derniers negronis, le DJ pose ses vinyles de disco italo et funk méditerranéen. Les verres tintent, les conversations s'animent jusqu'aux premières lueurs.",
    image: "https://framerusercontent.com/images/tVYSthOHdBgzrFq522NzHU3wajM.webp"
  }
];

export const EVENTS = [
  {
    id: "dj-friday",
    title: "Vendredi Soir au Santo",
    date: "Tous les vendredis · Dès 21h",
    highlight: "DJ Invité · 21H → TARD",
    desc: "Flacons naturels débouchés, fenêtres ouvertes sur la brise marine et sélection de vinyles italo-disco après le dîner. Sans réservation au bar.",
    badge: "Entrée Libre"
  },
  {
    id: "sunday-feast",
    title: "Le Grand Déjeuner du Dimanche",
    date: "Dimanche · 12h à 17h",
    highlight: "Grandes Pièces & Barbecue Marin",
    desc: "Daurades et bars sauvages grillés entiers au feu de sarments, marmites de linguine pour toute la tablée et tiramisu familial servi à la cuillère.",
    badge: "Sur Réservation"
  },
  {
    id: "winemakers-table",
    title: "La Table des Vignerons",
    date: "Premier jeudi du mois",
    highlight: "Dégustation & Rencontre Vigneronne",
    desc: "Cinq cuvées rares commentées en direct par des vignerons artisans de Provence, Sicile et Toscane, accordées à cinq assiettes marines de notre chef.",
    badge: "Places Limitées"
  }
];

export const PRIVATE_DINING_PACKAGES = [
  {
    number: "01",
    title: "Dîners Privés & Tablées Intimes",
    capacity: "8 à 22 personnes",
    description: "Une longue table dressée face à la mer, un menu dégustation en 5 temps créé selon la pêche du jour et vos envies, servi avec un accord mets & vins sur mesure.",
    perks: ["Menu dégustation personnalisé", "Sommelier dédié", "Espace semi-privatisé face au coucher de soleil", "Options végétariennes et marines"]
  },
  {
    number: "02",
    title: "Anniversaires & Grandes Réunions",
    capacity: "20 à 45 personnes",
    description: "Une formule conviviale d'antipasti à partager à volonté, plats de fête servis au centre de la table, gâteau maison au citron d'Amalfi et bar à cocktails privé.",
    perks: ["Buffet d'antipasti & cocktails d'accueil", "Gâteau signature avec bougies", "Système audio privatif", "Terrasse privative au coucher du soleil"]
  },
  {
    number: "03",
    title: "Privatisation Totale du Restaurant",
    capacity: "Jusqu'à 90 convives",
    description: "Le restaurant Santo Mare rien que pour vous : salle principale, comptoir en marbre et grande terrasse sur le quai. Équipe dédiée, chef et DJ pour une fête inoubliable.",
    perks: ["Accès exclusif salle & terrasse", "DJ Booth & système son haute fidélité", "Service de cocktails signature & barman dédié", "Décoration florale et éclairage sur mesure"]
  }
];
