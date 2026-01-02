<div style="text-align: center;">
  <img src="docs/banner.svg" height="180" alt="Bannière" />
  <h1>epiform</h1>
  Un outil de suivi en ligne des démarches administratives françaises, conçu pour les étudiants internationaux de l'<a href="https://github.com/epita">EPITA</a>.

![Node.js](https://img.shields.io/badge/Node.js-22.14.0-darkgreen?logo=node.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-darkblue?logo=tailwindcss)

[Wiki](https://github.com/s-amiour/epiform/wiki) · [English](./README.md) · Français
</div>

## Fonctionnalités

- [x] **Documentation** : Les instructions pour interagir avec le service sont fournies
- [x] **Interface épurée** : Une interface agréable, notamment grâce à l'effet de lueur du curseur et l'absence de délai de rechargement, permettant une expérience utilisateur fluide
- [x] **localStorage du navigateur** : La progression est sauvegardée tant que le cache du navigateur n'est pas effacé
- [x] **Procédures catégorisées** : Les démarches sont classées par nécessité
- [x] **Design Responsive** : Parfaitement adapté aux ordinateurs et mobiles
- [ ] **Traduction FR / EN** : Couvre 100% du vocabulaire nécessaire à un étudiant international de l'EPITA
- [ ] **Thème sombre** : Support natif du mode sombre pour réduire la fatigue oculaire

> Le `localStorage` du navigateur élimine le besoin d'un backend.

## Stack Technique
- **React 19** avec Vanilla JS
- **Vite** pour un rendu de développement rapide
- **TailwindCSS** pour un style efficace
- **Lucide React** pour les icônes
- **Vercel** pour le déploiement

## Démarrage

## Structure du Projet

```
├── docs/               # Fichiers liés à la documentation
│   └── banner.svg
├── public/             # Fichiers d'environnement
│   └── favicon.ico   
├── src/
│   ├── assets/images/  # Images liées aux composants
│       └── logo.svg 
│   ├── components/     # Composants React
│   │   ├── utils/      # Utilitaires pour les composants
│   │       └── GlowOverlay.jsx
│   │   ├── ContactUs.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Hero.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProcedureCard.jsx
│   │   ├── ProcedureDetail.jsx
│   │   └── Procedures.jsx
│   ├── App.tsx         # Composant principal de l'application
│   ├── index.css
│   ├── main.jsx        # Point d'entrée
│   └── proceduresData.json       # Données
├── .gitignore          # Fichiers exclus de Git
├── eslint.config.js    # Configuration pour le linting (qualité du code)
├── index.html          # Le point d'entrée principal de l'application
├── package.json        # Métadonnées du projet et liste des dépendances
├── package-lock.json   # Fichier de verrouillage des versions exactes des dépendances
├── README.md           # Documentation en Anglais
├── README_FR.md        # Documentation en Français
├── vercel.json         # Configuration de déploiement pour Vercel
└── vite.config.js      # Configuration pour le bundler Vite

```
## Utilisation
1.  Allez sur `dashboard/`
2.  Complétez vos démarches requises
3.  Marquez-les comme terminées

## Pour les Développeurs

Vous souhaitez contribuer à Epiform ou exécuter le code localement ?

* **[Lire la documentation développeur (Wiki)](https://github.com/s-amiour/epiform/wiki)**
* **[Installation](https://github.com/s-amiour/epiform/wiki/Installation)**
* **[Contribution](https://github.com/s-amiour/epiform/wiki/Contribution)**

# Inspiration
La bureaucratie française est connue pour être complexe, opaque et lourde (« La Paperasse »), ce qui en fait un point de douleur majeur pour les étudiants internationaux. Un outil dédié aux étudiants de l'EPITA résout un problème très spécifique et à haute valeur ajoutée.

> Pour toute erreur sur epiform, veuillez visiter la page [Contactez-nous](https://epiform.vercel.app/contact)