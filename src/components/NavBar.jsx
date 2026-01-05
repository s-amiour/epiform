import logo from '../assets/images/logo.svg';
import { Home, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";

const Navbar = ({ initialLang = 'en', darkMode, setDarkMode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Language state derived from props initially
    const [lang, setLang] = useState(initialLang);

    // Update lang if URL changes (optional, keeps in sync with path)
    useEffect(() => {
        if (location.pathname.startsWith("/fr")) {
            setLang("fr");
        } else {
            setLang("en");
        }
    }, [location.pathname]);

    const toggleLang = () => {
        const newLang = lang === "en" ? "fr" : "en";
        setLang(newLang);

        // Optional: update URL to match
        const newPath = location.pathname.replace(/^\/(en|fr)/, `/${newLang}`);
        navigate(newPath);
    };

    return (
        <nav className="
  fixed top-0 left-0 right-0
  bg-blue-700 dark:bg-blue-950
  border-b border-blue-500 dark:border-blue-900
  shadow-sm z-50 transition-colors duration-300
">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-6">
                        <a href={`/${lang}`} className="flex flex-shrink-0 items-center mr-4">
                            <img className="h-10 w-auto" src={logo} alt="/" />
                            <h2 className="text-white dark:text-gray-100 ml-1 font-mono">epiform</h2>
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Home Navigate */}
                        <button
                            onClick={() => navigate(`/${lang}`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-100 hover:bg-[#002299] transition-colors cursor-pointer"
                        >
                            <Home className="w-5 h-5" />
                            <span className="hidden sm:inline font-mono">{translate(uitext.home, lang)}</span>
                        </button>

                        {/* Contact Navigate */}
                        <button
                            onClick={() => navigate(`/${lang}/contact`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-100 hover:bg-[#002299] transition-colors cursor-pointer"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="hidden sm:inline font-mono">{translate(uitext.contactUs, lang)}</span>
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="ml-4 px-3 py-1 border rounded bg-white text-blue-800 font-mono"
                        >
                            {lang === "en" ? "FR" : "EN"}
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
