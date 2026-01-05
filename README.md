<p align="center">
  <img align="center" src="docs/banner.svg" height="180" alt="Banner" />
  <h1 align="center">epiform</h1>
  <p align="center">A web-based progress tracker for French administrative procedures, designed for international students @ <a href="https://github.com/epita">EPITA</a>.</p>
  
  <div align="center">
    <a href="https://epiform.vercel.app" target="_blank">
      <img src="https://img.shields.io/badge/Live_Demo-Visit_Site-success?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </div><br />

  <div align="center">
    
  ![Node.js](https://img.shields.io/badge/Node.js-20+-darkgreen?logo=node.js)
  ![React](https://img.shields.io/badge/React-19-blue?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-Bundler-purple?logo=vite)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-darkblue?logo=tailwindcss)
  </div>

  <div align="center">
    
  [Wiki](https://github.com/s-amiour/epiform/wiki) · English · [Français](./README_FR.md)
  </div>
</p>

<!-- Essential -->
## Features

- [x] **Modern UI**: Clean interface featuring a cursor glow effect and zero-reloading transitions for a seamless UX.
- [x] **Browser Persistence**: Uses `localStorage` to save progress automatically without requiring a server account.
- [x] **Smart Sorting**: Procedures are categorized by priority and urgency.
- [x] **Responsive Design**: Optimized for both desktop and mobile layouts.
- [ ] **FR / EN Translation**: Full bilingual support.
- [ ] **Dark Theme**: Native dark mode support.

<!-- !OPTIONAL: add screenshot of UI, or GIF showing cursor-glow -->

    > **Note:** The browser's `localStorage` eliminates the need for a backend, keeping user data strictly on their device for privacy.

<!-- Essential -->
## Tech Stack
- **Core:** React 19, Vanilla JS
- **Routing:** React Router 7
- **Build Tool:** Vite
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Deployment:** Vercel


<!-- Must always be available in a README -->
## Installation

**Prerequisites:** Node.js v20+

1. **Clone the repository**
```bash
git clone https://github.com/s-amiour/epiform.git
cd epiform
```
2. **Install dependencies**
```bash
npm install
```
3. **Start development server**
```bash
npm run dev
```
4. **Live site** at http://localhost:3001


<!-- Always mention what is unique to project compared to a typical project using your tech stack --> 
## Project Structure

```
├── docs/                    # Documentation-related files
├── public/                  # Static assets
├── src/
│   ├── assets/images/       # Global images
│   ├── components/          # React components
│   │   └── utils/           # Utilities for components
│   ├── App.jsx              # Main Layout
│   ├── index.css
│   ├── main.jsx             # Entry point
│   └── proceduresdata.json  # Data
├── README.md           
├── README_FR.md             # Documentation in French
├── vercel.json              # Deployment configuration for Vercel
├── vite.config.js           # Configuration for the Vite bundler
└── ...
```

<!-- Important to refer to Wiki for detailed contribution guidelines AND still give a summary in README -->
## Contributing
We welcome contributions, especially from people who may have experienced situations not mentioned in our project.

**Want to add a new procedure?**
You don't need to be a React expert. Simply edit `src/proceduresdata.json` to add new entries.

1. Check the [Wiki](https://github.com/s-amiour/epiform/wiki) to understand the architecture in more detail
2. Fork project
3. Create your feature branch (`git checkout -b feat/amazingFeature`)
4. Commit your changes (`git commit -m "feat(<scope>): add amazingFeature"`)
5. Push to branch (`git push origin feat/amazingFeature`)
6. Open a pull request


<!-- Insightful remark at end completes on a good note -->
# Inspiration
French bureaucracy is notorious for being complex, opaque, and paper-heavy ("La Paperasse"), making it a major pain point for international students. A dedicated tool for EPITA students solves a very specific, high-value problem.


<div align="center"> Found a bug? <a href="https://epiform.vercel.app/contact">Signal It</a> </div>
