// Sidebar.jsx - Mobile-only drawer component
import { useEffect } from "react";
import { X, OctagonAlert, Sparkle, ClipboardList } from 'lucide-react';
import { useLanguage } from "./context/Languagecontext";
import { translate } from "./utils/translate";
import uitext from "./utils/uitext";

const Sidebar = ({ procedures = [], selectedCategory, onCategoryChange, isOpen, onClose, lang }) => {
  const { lang: contextLang } = useLanguage();
  const currentLang = lang || contextLang;

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
    onCategoryChange(categoryId);
    onClose(); // Always close drawer after selection on mobile
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

        {/* Category tabs */}
        <nav className="flex flex-col p-4 space-y-2">
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
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
