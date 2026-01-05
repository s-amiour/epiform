import logo from '../assets/images/logo.svg';
import { Home, Phone, Menu } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";
import { useMobileMenu } from "./context/MobileMenuContext";

const Navbar = ({ initialLang = 'en', darkMode, setDarkMode }) => {
    const { openMenu } = useMobileMenu();
    const navigate = useNavigate();
    const location = useLocation();

    // Language state derived from props initially
    const [lang, setLang] = useState(initialLang);

    // Smooth movement to top if at Homepage
    const navigateHome = () => {
      let dir = `/${lang}`
      if (window.location.pathname === dir) {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top of page
      } else {
        navigate(dir); // navigate to home if not already
      }
    }

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
  bg-[#002299] dark:bg-blue-950
  border-b border-blue-500 dark:border-blue-900
  shadow-sm z-50 transition-colors duration-300
">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Mobile Menu Button - Visible on all pages, mobile only */}
                    <button
                        onClick={openMenu}
                        className="lg:hidden p-2 rounded-lg text-gray-100 hover:bg-[#002299] transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    
                    {/* Logo - Centered on mobile, left-aligned on desktop */}
                    <a href={`/${lang}`} className="flex flex-shrink-0 items-center absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-0 lg:transform-none">
                        <img className="h-10 w-auto" src={logo} alt="/" />
                        <h2 className="text-white dark:text-gray-100 ml-1 font-mono">epiform</h2>
                    </a>
                    
                    {/* Spacer for mobile to balance the burger menu */}
                    <div className="lg:hidden w-10"></div>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden lg:flex items-center gap-4">
                        {/* Home Navigate */}
                        <button
                            onClick={navigateHome}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-100 hover:bg-[#2647BF] dark:hover:bg-[#1F3070]   transition-colors cursor-pointer"
                        >
                            <Home className="w-5 h-5" />
                            <span className="hidden sm:inline font-mono">{translate(uitext.home, lang)}</span>
                        </button>

                        {/* Contact Navigate */}
                        <button
                            onClick={() => navigate(`/${lang}/contact`)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-100 hover:bg-[#2647BF] dark:hover:bg-[#1F3070] transition-colors cursor-pointer"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="hidden sm:inline font-mono">{translate(uitext.contactUs, lang)}</span>
                        </button>

                        {/* Language Toggle */}
                        <button
                            onClick={toggleLang}
                            className="ml-4 px-3 py-1 rounded bg-transparent text-gray-100  dark:text-gray-100 dark:hover:bg-[#1F3070] font-mono cursor-pointer transition-colors hover:bg-[#2647BF] "
                        >
                            {lang === "en" ? "FR" : "EN"}
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="px-2 py-2 rounded-lg bg-transparent hover:bg-[#2647BF] dark:hover:bg-[#1F3070] transition-colors cursor-pointer"
                        >
                          {
                            darkMode ?
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                id="lucid-sun"
                                className="text-yellow-300"
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
                            :
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                id="lucid-moon"
                                className="text-gray-400"
                              >
                                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                              </svg>
                          }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
