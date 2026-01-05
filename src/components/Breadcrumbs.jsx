// Breadcrumbs.jsx
import { Link } from "react-router-dom";
import { ChevronRight, Home } from 'lucide-react';
import { useLanguage } from "./context/Languagecontext";
import { translate } from "./utils/translate";
import uitext from "./utils/uitext";

const Breadcrumbs = ({ items = [], lang }) => {
  const { lang: contextLang } = useLanguage();
  const currentLang = lang || contextLang;

  // Default breadcrumbs: Home > Procedures
  const defaultItems = [
    { label: translate(uitext.home, currentLang), path: `/${currentLang}` },
    { label: translate(uitext.dashboardTitle, currentLang), path: `/${currentLang}/procedures` }
  ];

  const breadcrumbItems = items.length > 0 ? items : defaultItems;

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4" aria-label="Breadcrumb">
      <Link
        to={breadcrumbItems[0].path}
        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>{breadcrumbItems[0].label}</span>
      </Link>
      
      {breadcrumbItems.slice(1).map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;

