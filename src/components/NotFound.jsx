// NotFound.jsx
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import { useLanguage } from "./context/Languagecontext";
import { translate } from "./utils/translate";
import uitext from "./utils/uitext";

const NotFound = ({ lang }) => {
  const { lang: contextLang } = useLanguage();
  const currentLang = lang || contextLang;
  const navigate = useNavigate();

  const goHome = () => {
    navigate(`/${currentLang}`);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex items-center justify-center pt-16 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <AlertCircle className="w-24 h-24 mx-auto text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* Gradient Heading */}
        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-extrabold mb-6 bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
          404
        </h1>

        {/* Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {currentLang === 'fr' ? 'Page non trouvée' : 'Page Not Found'}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          {currentLang === 'fr' 
            ? "Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
            : "Sorry, the page you're looking for doesn't exist or has been moved."}
        </p>

        {/* Back to Home Button */}
        <button
          onClick={goHome}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-700 to-indigo-400 text-white rounded-lg font-medium hover:from-indigo-800 hover:to-indigo-500 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span>{translate(uitext.home, currentLang)}</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;

