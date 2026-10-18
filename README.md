# Santo Mare — Restaurant & Trattoria de Mer (Marseille)

> **Cuisine côtière italo-provençale, assiettes à partager, vins vivants & belles nuits.**  
> Situé au 14 Rue de la Marine, 13002 Marseille (Vieux-Port, 43°17’48”N · 5°22’13”E).

---

## 🌊 Aperçu du Projet

Site web complet, immersif et réactif pour le restaurant **Santo Mare**, inspiré des trattorias côtières et bistrots maritimes de la Méditerranée.

### 🌟 Fonctionnalités Clés

- **📸 Prévisualisation interactive des plats au survol** : survoler n'importe quel plat dans la carte fait apparaître une vignette photo haute définition avec badges, prix et accord mets & vins conseillé (avec fallback tactile sur mobile).
- **📖 Carte saisonnière complète (`/menu`)** : les 5 services traduits et sublimés (*Pour Commencer*, *De la Cuisine*, *Pour la Table*, *Douceurs*, *Apéritif & Flacons*), filtres instantanés (*Signatures*, *Pêche Locale*, *Végétarien*).
- **🍽️ Carrousel interactif « Faites tourner l'assiette »** : animation fluide mettant en valeur les 4 plats emblématiques du chef avec visuels détourés en lévitation.
- **✨ Sélecteur d'ambiance « Un Lieu, Trois Moments de Vie »** : bascule dynamique entre *Le Midi en Terrasse*, *Le Dîner aux Chandelles* et *Tard le Soir & DJ Set*.
- **📅 Moteur de réservation complet (`/book-a-table`)** : choix du nombre de convives (1 à 8+), date, service (Midi / Soir), créneau horaire, préférence d'emplacement (*Terrasse mer*, *Salle intérieure*, *Comptoir du chef*), et confirmation instantanée avec confettis et référence unique.
- **🍾 Espace Privatisation & Événements (`/private-dining`)** : 3 formules sur-mesure (dîners privés, anniversaires, privatisation totale jusqu'à 90 personnes) avec formulaire de devis interactif.
- **🧭 Page 404 sur-mesure (`/404`)** : navigation de secours pleine de charme marin.
- **🎨 Typographie méditerranéenne raffinée** : abandon du style machine à écrire (IBM/Courier) au profit des polices éditoriales **Fraunces**, **Cormorant Garamond** et **Plus Jakarta Sans**.
- **📱 Responsive & Accessible** : tiroir de navigation mobile, animations fluides, contrastes soignés.

---

## 🛠️ Stack Technique

- **Framework** : React 19 + Vite 6
- **Styles** : Tailwind CSS 3
- **Animations & Effets** : GSAP 3, Canvas Confetti
- **Icônes** : Lucide React
- **Typographie** : Google Fonts (Fraunces, Cormorant Garamond, Plus Jakarta Sans)

---

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+
- npm ou pnpm

### Installation & Lancement
```bash
# 1. Cloner le dépôt
git clone https://github.com/AlphaxLegrand/santo-mare-restaurant.git
cd santo-mare-restaurant

# 2. Installer les dépendances
npm install

# 3. Lancer en local
npm run dev
```

Ouvrez ensuite [http://localhost:5173](http://localhost:5173) dans votre navigateur.

### Build de Production
```bash
npm run build
```
Les fichiers statiques optimisés seront générés dans le dossier `dist/`.

---

## 📂 Structure du Projet

```text
├── index.html                   # HTML d'entrée & import des polices Google
├── package.json                 # Dépendances & scripts
├── tailwind.config.js           # Palette de couleurs méditerranéenne & tokens
├── vite.config.js               # Configuration Vite
├── src/
│   ├── main.jsx                 # Point d'entrée React
│   ├── App.jsx                  # Routeur client & mise en page
│   ├── index.css                # Directives Tailwind & styles globaux
│   ├── data/
│   │   └── restaurantData.js    # Données des menus, plats, horaires et textes
│   ├── components/
│   │   ├── Navbar.jsx           # Barre de navigation fixe & tiroir mobile
│   │   ├── Footer.jsx           # Pied de page complet avec horaires & coordonnées
│   │   ├── Marquee.jsx          # Ruban défilant infini
│   │   └── DishHoverPreview.jsx # Carte flottante de prévisualisation au survol
│   └── pages/
│       ├── HomePage.jsx         # Page d'accueil & sections interactives
│       ├── MenuPage.jsx         # Page de la carte complète
│       ├── BookTablePage.jsx    # Système de réservation
│       ├── PrivateDiningPage.jsx# Formules & formulaire de privatisation
│       └── NotFoundPage.jsx     # Page 404
```

---

## 📜 Licence
Projet réalisé sous licence MIT.
