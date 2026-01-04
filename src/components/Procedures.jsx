// Procedures.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { 
  CheckCircle2, ChevronDown, ChevronUp, ArrowRight, OctagonAlert, 
  Sparkle, ClipboardList, ArrowLeft 
} from 'lucide-react';
import ProcedureCard from './ProcedureCard';
import uitext from "./utils/uitext";
import { translate } from "./utils/translate"; 

const Procedures = ({ procedures = [], onStatusChange, firstObligatoryProcedure, lang }) => {
  const [expandedCategory, setExpandedCategory] = useState(() => {
    return sessionStorage.getItem('expandedCategory') || 'obligatory';
  });

  const obligatoryProcedures = procedures.filter(p => p.category === 'obligatory');
  const highlyRecommendedProcedures = procedures.filter(p => p.category === 'highly-recommended');
  const optionalProcedures = procedures.filter(p => p.category === 'optional');

  const completedObligatory = obligatoryProcedures.filter(p => p.status === 'completed').length;
  const completedHighlyRecommended = highlyRecommendedProcedures.filter(p => p.status === 'completed').length;
  const completedOptional = optionalProcedures.filter(p => p.status === 'completed').length;
  const totalCompleted = completedObligatory + completedHighlyRecommended + completedOptional;
  const totalProcedures = procedures.length;
  const progressPercentage = totalProcedures > 0 ? (totalCompleted / totalProcedures) * 100 : 0;

  const obligatoryRef = useRef(null);
  const highlyRecommendedRef = useRef(null);
  const optionalRef = useRef(null);

  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${lang}`); // fallback to home
    }
  };

  const toggleCategory = (category) => {
    const newCategory = expandedCategory === category ? null : category;
    setExpandedCategory(newCategory);
    sessionStorage.setItem('expandedCategory', newCategory);

    if (newCategory) {
      setTimeout(() => {
        let ref;
        if (newCategory === 'obligatory') ref = obligatoryRef;
        else if (newCategory === 'highly-recommended') ref = highlyRecommendedRef;
        else if (newCategory === 'optional') ref = optionalRef;

        ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
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
    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 pb-16 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            {translate(uitext.back, lang)}
          </button>
        </div>

        {/* Page title */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0033CC] dark:text-[#4F95FF] mb-4">
            {translate(uitext.dashboardTitle, lang)}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
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
        <div className="bg-indigo-950 rounded-lg shadow-sm border border-gray-800 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-100">{translate(uitext.yourProgress, lang)}</h2>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <span className="text-gray-300">
                {totalCompleted} {translate(uitext.of, lang)} {totalProcedures} {translate(uitext.completed, lang)}
              </span>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">{translate(uitext.obligatory, lang)}</p>
              <p className="text-gray-100">{completedObligatory}/{obligatoryProcedures.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">{translate(uitext.highlyRecommended, lang)}</p>
              <p className="text-gray-100">{completedHighlyRecommended}/{highlyRecommendedProcedures.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">{translate(uitext.optional, lang)}</p>
              <p className="text-gray-100">{completedOptional}/{optionalProcedures.length}</p>
            </div>
          </div>
        </div>

        {/* Procedure Categories */}
        {[
          {
            key: 'obligatory',
            title: translate(uitext.obligatory, lang),
            subtitle: translate(uitext.obligatorySubtitle, lang),
            icon: OctagonAlert,
            procedures: obligatoryProcedures,
            ref: obligatoryRef
          },
          {
            key: 'highly-recommended',
            title: translate(uitext.highlyRecommended, lang),
            subtitle: translate(uitext.highlyRecommendedSubtitle, lang),
            icon: Sparkle,
            procedures: highlyRecommendedProcedures,
            ref: highlyRecommendedRef
          },
          {
            key: 'optional',
            title: translate(uitext.optional, lang),
            subtitle: translate(uitext.optionalSubtitle, lang),
            icon: ClipboardList,
            procedures: optionalProcedures,
            ref: optionalRef
          }
        ].map(section => (
          <div className="mb-6" key={section.key} ref={section.ref}>
            <button
              onClick={() => toggleCategory(section.key)}
              className="w-full bg-white rounded-lg shadow-sm border-2 border-gray-200 p-4 hover:border-gray-300 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl"><section.icon className="w-5 h-5 text-gray-700"/></span>
                  <div className="text-left">
                    <h2 className="text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-600">{section.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">
                    {section.procedures.filter(p => p.status === 'completed').length}/{section.procedures.length} {translate(uitext.completed, lang)}
                  </span>
                  {expandedCategory === section.key ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>
            </button>

            {expandedCategory === section.key && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {section.procedures.map(procedure => (
                  <ProcedureCard
                    key={procedure.id}
                    procedure={procedure}
                    onStatusChange={(newStatus) => onStatusChange(procedure.id, newStatus)}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Emergency Numbers */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-5 mt-6">
          <div className="text-red-900">
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
