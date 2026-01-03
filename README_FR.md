<p align="center">
  <img align="center" src="docs/banner.svg" height="180" alt="Bannière" />
  <h1 align="center">epiform</h1>
  <p align="center">Un outil de suivi en ligne des démarches administratives françaises, conçu pour les étudiants internationaux de <a href="https://github.com/epita">l'EPITA</a>.</p>

  <div align="center">
    <a href="https://epiform.vercel.app">
      <img src="https://img.shields.io/badge/demo_en_direct-visiter_le_site-success?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </div>

  <div align="center">
    
  ![Node.js](https://img.shields.io/badge/Node.js-20+-darkgreen?logo=node.js)
  ![React](https://img.shields.io/badge/React-19-blue?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-Bundler-purple?logo=vite)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-darkblue?logo=tailwindcss)
  </div>

  <div align="center">  
    
  [Wiki](https://github.com/s-amiour/epiform/wiki) · [English](./README.md) · Français
  </div>
</p>

<!-- Essentiel -->
## Fonctionnalités
- [x] **Interface utilisateur moderne** : interface épurée avec un effet lumineux de curseur et des transitions sans rechargement pour une UX transparente.
- [x] **Persistance du navigateur** : utilise `localStorage` pour enregistrer automatiquement la progression sans nécessiter de compte serveur.
- [x] **Tri intelligent** : les procédures sont classées par priorité et urgence.
- [x] **Responsive Design** : optimisé pour les mises en page de bureau et mobiles.
- [ ] **Traduction FR / EN** : Support bilingue complet.
- [ ] **Thème sombre** : prise en charge native du mode sombre.

> **Remarque :** Le « localStorage » du navigateur élimine le besoin d'un backend, conservant les données de l'utilisateur strictement sur leur appareil pour la confidentialité.

<!-- Essentiel -->
## Stack Technique
- **Cœur :** React 19, Vanilla JS
- **Routing :** React Router 7
- **Build Tool :** pour un rendu de développement rapide
- **Style :** TailwindCSS
- **Icônes :** Lucide React
- **Déploiement :** Vercel

<!-- Doit toujours être disponible dans un README -->
## Installation

**Prérequis :** Node.js v20+

1. **Cloner le dépôt**
```bash
git clone https://github.com/s-amiour/epiform.git
cd epiform
``` 
2. **Installer les dépendances**
```bash
npm install
```
3. **Lancer le serveur du développement**
```bash
npm run dev
```
4. Site en direct sur http://localhost:3001

<!-- Mentionnez toujours ce qui est unique au projet par rapport à un projet typique utilisant votre pile technologique -->
## Structure du Projet

```
├── docs/                    # Fichiers documentataires
├── public/                  # Fichiers statiques
├── src/
│   ├── assets/images/       # Images globaux
│   ├── components/          # Components React
│   │   └── utils/           # Utilités pour composants
│   ├── App.jsx              # Layout Principal
│   ├── index.css
│   ├── main.jsx             # Point d'entrée
│   └── proceduresdata.json  # Données JSON des procédures
├── README.md                # Documentation en Anglais
├── README_FR.md             
├── vercel.json              # Configuration de déploiement Vercel
├── vite.config.js           # Configuration Vite
└── ...
```

<!-- Important de se référer au Wiki pour les directives de contribution détaillées ET de toujours donner un résumé dans README -->
## Contribuer
Les contributions sont les bienvenues, en particulier de la part de personnes ayant rencontré des situations non mentionnées dans notre projet.

**Vous souhaitez ajouter une nouvelle procédure ?**
Vous n'avez pas besoin d'être un expert React. Modifiez simplement `src/proceduresdata.json` pour ajouter de nouvelles entrées.

1. Consultez le [Wiki](https://github.com/s-amiour/epiform/wiki) pour comprendre l'architecture plus en détail.
2. Forkez le projet
3. Créez votre branche de fonctionnalité (`git checkout -b feat/amazingFeature`)
4. Commitez vos modifications (`git commit -m "feat(<scope>): add amazingFeature"`)
5. Poussez vers la branche (`git push origin feat/amazingFeature`)
6. Ouvrez une Pull Request

<!-- Remarque perspicace à la fin se termine sur une bonne note -->
# Inspiration
La bureaucratie française est connue pour être complexe, opaque et envahie par la paperasse, ce qui en fait une source de difficultés majeure pour les étudiants internationaux. Un outil dédié aux étudiants de l'EPITA résout un problème très spécifique et à forte valeur ajoutée.


<div align="center"> Vous avez trouvé un bug ? <a href="https://epiform.vercel.app/contact">Contactez-nous</a> </div>