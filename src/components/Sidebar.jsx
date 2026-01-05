// Sidebar.jsx - Mobile-only drawer component
import { useEffect, useState } from "react";
import { X, OctagonAlert, Sparkle, ClipboardList, Home, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from "./context/Languagecontext";
import { translate } from "./utils/translate";
import uitext from "./utils/uitext";

const Sidebar = ({ procedures = [], selectedCategory, onCategoryChange, isOpen, onClose, lang, darkMode, setDarkMode }) => {
  const { lang: contextLang } = useLanguage();
  const currentLang = lang || contextLang;
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get darkMode from props or localStorage
  const [localDarkMode, setLocalDarkMode] = useState(() => {
    if (darkMode !== undefined) return darkMode;
    return localStorage.getItem("darkMode") === "true";
  });

  // Sync with props if provided
  useEffect(() => {
    if (darkMode !== undefined) {
      setLocalDarkMode(darkMode);
    }
  }, [darkMode]);

  // Always show categories if procedures are available
  const showCategories = procedures.length > 0;

  // Handle ESC key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate category counts
  const obligatoryProcedures = procedures.filter(p => p.category === 'obligatory');
  const highlyRecommendedProcedures = procedures.filter(p => p.category === 'highly-recommended');
  const optionalProcedures = procedures.filter(p => p.category === 'optional');

  const completedObligatory = obligatoryProcedures.filter(p => p.status === 'completed').length;
  const completedHighlyRecommended = highlyRecommendedProcedures.filter(p => p.status === 'completed').length;
  const completedOptional = optionalProcedures.filter(p => p.status === 'completed').length;

  // Category data structure
  const categories = [
    {
      id: 'obligatory',
      icon: OctagonAlert,
      label: translate(uitext.obligatory, currentLang),
      count: obligatoryProcedures.length,
      completed: completedObligatory
    },
    {
      id: 'highly-recommended',
      icon: Sparkle,
      label: translate(uitext.highlyRecommended, currentLang),
      count: highlyRecommendedProcedures.length,
      completed: completedHighlyRecommended
    },
    {
      id: 'optional',
      icon: ClipboardList,
      label: translate(uitext.optional, currentLang),
      count: optionalProcedures.length,
      completed: completedOptional
    }
  ];

  const handleCategoryClick = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
    // Close drawer after a short delay to allow navigation
    setTimeout(() => {
      onClose();
    }, 100);
  };

  // Navigation handlers
  const handleHome = () => {
    const dir = `/${currentLang}`;
    if (window.location.pathname === dir) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(dir);
    }
    onClose();
  };

  const handleContact = () => {
    navigate(`/${currentLang}/contact`);
    onClose();
  };

  const handleToggleLang = () => {
    const newLang = currentLang === "en" ? "fr" : "en";
    const newPath = location.pathname.replace(/^\/(en|fr)/, `/${newLang}`);
    navigate(newPath);
    onClose();
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !localDarkMode;
    setLocalDarkMode(newDarkMode);
    
    // Update localStorage
    localStorage.setItem("darkMode", newDarkMode);
    
    // Update DOM
    const root = window.document.documentElement;
    if (newDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    
    // Call prop setter if provided
    if (setDarkMode) {
      setDarkMode(newDarkMode);
    }
    // Don't close menu on dark mode toggle
  };

  return (
    <>
      {/* Mobile backdrop overlay - 60% width drawer with dimmed backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 dark:bg-black/70 transition-opacity duration-300"
          onClick={onClose}
          onTouchStart={onClose}
          aria-hidden="true"
          role="button"
          tabIndex={-1}
        />
      )}

      {/* Mobile Drawer - 60% width */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-[60%] max-w-sm
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Drawer Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {translate(uitext.menu || 'Menu', currentLang)}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation and Content */}
        <nav className="flex flex-col p-4 space-y-2 overflow-y-auto">
          {/* Navigation Section */}
          <button
            onClick={handleHome}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
          >
            <Home className="w-5 h-5 flex-shrink-0 text-gray-600 dark:text-gray-300" />
            <span className="font-medium">{translate(uitext.home, currentLang)}</span>
          </button>

          <button
            onClick={handleContact}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
          >
            <Phone className="w-5 h-5 flex-shrink-0 text-gray-600 dark:text-gray-300" />
            <span className="font-medium">{translate(uitext.contactUs, currentLang)}</span>
          </button>

          {/* Divider before category tabs (if procedures available) */}
          {showCategories && categories.length > 0 && (
            <>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              
              {/* Category tabs */}
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`
                      flex items-center gap-3 p-4 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-700 to-indigo-400 text-white shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }
                    `}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                    <div className="flex-1 text-left">
                      <div className="font-medium">{category.label}</div>
                      <div className={`text-xs ${isActive ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>
                        {category.completed}/{category.count} {translate(uitext.completed, currentLang)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </>
          )}

          {/* Divider before settings */}
          <hr className="my-2 border-gray-200 dark:border-gray-700" />

          {/* Settings Section */}
          <button
            onClick={handleToggleDarkMode}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
          >
            {localDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-yellow-300 flex-shrink-0"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600 dark:text-gray-300 flex-shrink-0"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            )}
            <span className="font-medium">
              {localDarkMode ? translate(uitext.lightMode || 'Light Mode', currentLang) : translate(uitext.darkMode || 'Dark Mode', currentLang)}
            </span>
          </button>

          <button
            onClick={handleToggleLang}
            className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200"
          >
            <span className="w-5 h-5 flex items-center justify-center flex-shrink-0 text-gray-600 dark:text-gray-300 font-mono text-sm">
              {currentLang === "en" ? "FR" : "EN"}
            </span>
            <span className="font-medium">
              {translate(uitext.language || 'Language', currentLang)} ({currentLang === "en" ? "FR" : "EN"})
            </span>
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
