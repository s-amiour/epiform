// Procedures.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  CheckCircle2, ArrowRight, ArrowLeft, OctagonAlert, Sparkle, ClipboardList
} from 'lucide-react';
import ProcedureCard from './ProcedureCard';
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";

const Procedures = ({ procedures = [], onStatusChange, firstObligatoryProcedure, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return sessionStorage.getItem('selectedCategory') || 'obligatory';
  });

  // Listen for category changes from Sidebar
  useEffect(() => {
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.detail);
    };
    window.addEventListener('categoryChanged', handleCategoryChange);
    return () => window.removeEventListener('categoryChanged', handleCategoryChange);
  }, []);

  const obligatoryProcedures = procedures.filter(p => p.category === 'obligatory');
  const highlyRecommendedProcedures = procedures.filter(p => p.category === 'highly-recommended');
  const optionalProcedures = procedures.filter(p => p.category === 'optional');

  const completedObligatory = obligatoryProcedures.filter(p => p.status === 'completed').length;
  const completedHighlyRecommended = highlyRecommendedProcedures.filter(p => p.status === 'completed').length;
  const completedOptional = optionalProcedures.filter(p => p.status === 'completed').length;
  const totalCompleted = completedObligatory + completedHighlyRecommended + completedOptional;
  const totalProcedures = procedures.length;
  const progressPercentage = totalProcedures > 0 ? (totalCompleted / totalProcedures) * 100 : 0;

  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${lang}`); // fallback to home
    }
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    sessionStorage.setItem('selectedCategory', categoryId);
  };

  // Get procedures for selected category
  const getFilteredProcedures = () => {
    switch (selectedCategory) {
      case 'obligatory':
        return obligatoryProcedures;
      case 'highly-recommended':
        return highlyRecommendedProcedures;
      case 'optional':
        return optionalProcedures;
      default:
        return obligatoryProcedures;
    }
  };

  const filteredProcedures = getFilteredProcedures();

  // Category data for tabs
  const categories = [
    {
      id: 'obligatory',
      icon: OctagonAlert,
      label: translate(uitext.obligatory, lang),
      count: obligatoryProcedures.length,
      completed: completedObligatory
    },
    {
      id: 'highly-recommended',
      icon: Sparkle,
      label: translate(uitext.highlyRecommended, lang),
      count: highlyRecommendedProcedures.length,
      completed: completedHighlyRecommended
    },
    {
      id: 'optional',
      icon: ClipboardList,
      label: translate(uitext.optional, lang),
      count: optionalProcedures.length,
      completed: completedOptional
    }
  ];

  useEffect(() => {
    const procedureId = sessionStorage.getItem('scrollToProcedure');
    if (procedureId) {
      const element = document.getElementById(`procedure-${procedureId}`);
      if (element) {
        const yOffset = -80; // adjust to match your navbar height
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      sessionStorage.removeItem('scrollToProcedure');
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pb-16 min-h-screen">

      {/* Sticky Horizontal Category Tabs - Desktop Only */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm hidden lg:block">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-none
                    transition-all duration-200
                    border-b-2
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-700 to-indigo-400 text-white border-indigo-500 shadow-md'
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 border-transparent'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                  <span className="font-medium">{category.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {category.completed}/{category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{translate(uitext.back, lang)}</span>
          </button>
        </div>

        {/* Page title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0033CC] dark:text-[#4F95FF] mb-4">
            {translate(uitext.dashboardTitle, lang)}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {translate(uitext.dashboardSubtitle, lang)}
          </p>
        </div>

        {/* Get Started CTA */}
        {firstObligatoryProcedure && (
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-950 rounded-lg p-6 mb-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white mb-2">{translate(uitext.ctaTitle, lang)}</h2>
                <p className="text-blue-100">{translate(uitext.ctaSubtitle, lang)}</p>
              </div>
              <Link
                to={`/${lang}/procedures/procedure/${firstObligatoryProcedure.slugEn}`}
                className="bg-gray-200 text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>{translate(uitext.startHere, lang)}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        {/* Progress Tracker */}
        <div className="bg-indigo-950 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-800 dark:border-gray-700 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-100 dark:text-gray-200">{translate(uitext.yourProgress, lang)}</h2>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-gray-300 dark:text-gray-300">
                {totalCompleted} {translate(uitext.of, lang)} {totalProcedures} {translate(uitext.completed, lang)}
              </span>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-400 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-400 dark:text-gray-400">{translate(uitext.obligatory, lang)}</p>
              <p className="text-gray-100 dark:text-gray-200">{completedObligatory}/{obligatoryProcedures.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 dark:text-gray-400">{translate(uitext.highlyRecommended, lang)}</p>
              <p className="text-gray-100 dark:text-gray-200">{completedHighlyRecommended}/{highlyRecommendedProcedures.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400 dark:text-gray-400">{translate(uitext.optional, lang)}</p>
              <p className="text-gray-100 dark:text-gray-200">{completedOptional}/{optionalProcedures.length}</p>
            </div>
          </div>
        </div>

        {/* Procedure Cards - Filtered by Selected Category */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProcedures.map(procedure => (
              <ProcedureCard
                key={procedure.id}
                procedure={procedure}
                onStatusChange={(newStatus) => onStatusChange(procedure.id, newStatus)}
                lang={lang}
              />
            ))}
          </div>
          {filteredProcedures.length === 0 && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <p>{translate(uitext.noProcedures || 'No procedures found', lang)}</p>
            </div>
          )}
        </div>

        {/* Emergency Numbers */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-5 mt-6">
          <div className="text-red-900 dark:text-red-200">
            <p className="font-bold text-lg mb-1">{translate(uitext.emergencyNumbers, lang)}</p>
            <p className="mb-2">{translate(uitext.emergencyIntro, lang)}</p>
            <ul className="list-disc list-inside space-y-1 font-medium">
              <li><span className="font-bold">112</span>: {translate(uitext.emergencyGeneral, lang)}</li>
              <li><span className="font-bold">15</span>: {translate(uitext.emergencyMedical, lang)}</li>
              <li><span className="font-bold">17</span>: {translate(uitext.emergencyPolice, lang)}</li>
              <li><span className="font-bold">18</span>: {translate(uitext.emergencyFire, lang)}</li>
              <li><span className="font-bold">114</span>: {translate(uitext.emergencyDeaf, lang)}</li>
            </ul>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Procedures;
