<div style="text-align: center;">
  <img src="docs/banner.svg" height="180" alt="Banner" />
  <h1>epiform</h1>
  A web-based progress tracker for French administrative procedures, designed for international students @ <a href="https://github.com/epita">EPITA</a>.

  ![Node.js](https://img.shields.io/badge/Node.js-22.14.0-darkgreen?logo=node.js)
  ![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple?logo=vite)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-darkblue?logo=tailwindcss)

  [Wiki](https://github.com/s-amiour/epiform/wiki) · English · [Français](./README_FR.md)
</div>

## Features

- [x] **Frontend documentation**: Instructions on how to interact with the service are provided
- [x] **Clean UI**: Appeasing interface, notably the cursor glow effect & no reloading delay, allows for a facile UX
- [x] **Browser `localStorage`**: Progress is saved as long as browser's cache is not cleared
- [x] **Categorized Procedures**: Procedures are categorized by necessity
- [x] **Responsive Design**: Perfectly suitable for desktop and mobile use
- [ ] **FR / EN Translation**: covers 100% of language needed for an EPITA international student
- [ ] **Dark Theme**: Native dark mode support to reduce eye strain

> The browser's `localStorage` eliminates the need for a backend.

## Tech Stack
- **React 19** with Vanilla JS
- **Vite** for fast development rendering
- **TailwindCSS** for efficient styling
- **Lucide React** for icon usage
- **Vercel** for deployment

## Getting Started

## Project Structure

```
├── docs/               # Documentation-related files
│   └── banner.svg
├── public/             # Environmental files
│   └── favicon.ico   
├── src/
│   ├── assets/images/  # component-related images
│       └── logo.svg 
│   ├── components/     # React components
│   │   ├── utils/      # Utilities for components
│   │       └── GlowOverlay.jsx
│   │   ├── ContactUs.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Hero.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProcedureCard.jsx
│   │   ├── ProcedureDetail.jsx
│   │   └── Procedures.jsx
│   ├── App.tsx         # Main app component
│   ├── index.css
│   ├── main.jsx        # Entry-point
│   └── proceduresData.json       # Data
├── .gitignore          # Files excluded from Git
├── eslint.config.js    # Configuration for code linting (quality checks)
├── index.html          # The main entry point of your app
├── package.json        # Project metadata and list of dependencies
├── package-lock.json   # Exact version lockfile for dependencies
├── README.md           # Documentation in English
├── README_FR.md        # Documentation in French
├── vercel.json         # Deployment configuration for Vercel
└── vite.config.js      # Configuration for the Vite bundler

```

## Usage
1.  Go to `dashboard/`
2.  Complete your required procedures
3.  Mark them as done

## For Developers

Want to contribute to Epiform or run the code locally?

* **[Read the Developer Documentation (Wiki)](https://github.com/s-amiour/epiform/wiki)**
* **[Installation](https://github.com/s-amiour/epiform/wiki/Installation)**
* **[Contribution](https://github.com/s-amiour/epiform/wiki/Contribution)**

# Inspiration
French bureaucracy is notorious for being complex, opaque, and paper-heavy ("La Paperasse"), making it a major pain point for international students. A dedicated tool for EPITA students solves a very specific, high-value problem.

>For any error in epiform, please visit [Contact Us](https://epiform.vercel.app/contact)