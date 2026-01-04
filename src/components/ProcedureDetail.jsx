import {
    ArrowLeft,
    Clock,
    CheckCircle2,
    Circle,
    ExternalLink,
    Lightbulb,
    FileText,
    ListChecks,
    AlertTriangle,
    MessageSquare,
    Link
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useLanguage } from "./context/Languagecontext";
import { translate } from "./utils/translate";
import uiText from "./utils/uitext";

const ProcedureDetail = ({ procedure, allProcedures, onStatusChange,lang }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const categoryInfo = {
        obligatory: {
            color: "red",
            label: { en: "Obligatory", fr: "Obligatoire" },
            emoji: "⚠️"
        },
        "highly-recommended": {
            color: "emerald",
            label: { en: "Highly Recommended", fr: "Fortement recommandé" },
            emoji: "✨"
        },
        optional: {
            color: "blue",
            label: { en: "Optional", fr: "Optionnel" },
            emoji: "ℹ️"
        }
    };

    const info = categoryInfo[procedure.category];

    const toggleStatus = () => {
        onStatusChange(procedure.id, procedure.status === 'todo' ? 'completed' : 'todo');
    };

    const goBack = () => {
    // Store the current procedure ID in sessionStorage
    sessionStorage.setItem('scrollToProcedure', procedure.id);

    // Navigate to the procedures page of the current language
    navigate(`/${lang}/procedures`);
};


    const prerequisiteProcedures = procedure.prerequisites
        ?.map(id => allProcedures.find(p => p.id === id))
        .filter(Boolean);

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <button
                        onClick={goBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>{translate(uiText.backToProcedures, lang)}</span>
                    </button>

                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className={`text-${info.color}-700`}>
                                    {translate(procedure.title, lang)}
                                </h1>
                                <span className={`bg-${info.color}-100 text-${info.color}-800 px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                                    <span>{info.emoji}</span>
                                    <span>{translate(info.label, lang)}</span>
                                </span>
                            </div>

                            {procedure.timeConstraint && (
                                <div className="flex items-center gap-2 text-orange-600 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 inline-flex">
                                    <Clock className="w-5 h-5" />
                                    <span>{translate(procedure.timeConstraint, lang)}</span>
                                </div>
                            )}
                        </div>

                        {/* Toggle Status */}
                        <button
                            onClick={toggleStatus}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:scale-105 ${
                                procedure.status === 'completed'
                                    ? 'text-green-600 bg-green-50 border-green-200'
                                    : 'text-gray-400 bg-gray-50 border-gray-200'
                            } cursor-pointer`}
                        >
                            {procedure.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                <Circle className="w-5 h-5" />
                            )}
                            <span>
                                {procedure.status === "completed"
                                    ? translate(uiText.completed, lang)
                                    : translate(uiText.markDone, lang)}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* Warning Section */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-5 mb-6">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-orange-900 mb-1 font-bold">
                                {translate(uiText.accuracyTitle, lang)}
                            </h3>
                            <p className="text-sm text-orange-800">
                                {translate(uiText.accuracyText, lang)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Overview */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <h2 className="text-gray-900 mb-3">{translate(uiText.overview, lang)}</h2>
                    <p className="text-gray-700 leading-relaxed">
                        {translate(procedure.detailedInfo?.overview, lang) || translate(procedure.description, lang)}
                    </p>
                </div>

                {/* Prerequisites */}
                {prerequisiteProcedures && prerequisiteProcedures.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-gray-900 mb-3">{translate(uiText.prerequisites, lang)}</h2>
                        <p className="text-gray-600 mb-3">{translate(uiText.prerequisitesDescription, lang)}</p>
                        <div className="space-y-2">
                            {prerequisiteProcedures.map(prereq => (
                                <div key={prereq.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    {prereq.status === 'completed' ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                    )}
                                    <span className={prereq.status === 'completed' ? 'text-gray-600' : 'text-gray-900'}>
                                        {translate(prereq.title, lang)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Discussion */}
                {procedure.detailedInfo?.discussion && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="w-6 h-6 text-indigo-600" />
                            <h2 className="text-gray-900">{translate(uiText.discussion, lang)}</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {translate(procedure.detailedInfo.discussion, lang)}
                        </p>
                    </div>
                )}

                {/* Steps */}
                {procedure.detailedInfo?.steps?.[lang]?.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <ListChecks className="w-6 h-6 text-blue-600" />
                            <h2 className="text-gray-900">{translate(uiText.steps, lang)}</h2>
                        </div>
                        <ol className="space-y-3">
                            {procedure.detailedInfo?.steps?.[lang]?.map((step, index) => (
                                <li key={index} className="flex gap-3">
                                    <span className="flex-shrink-0 w-7 h-7 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700 pt-0.5">{step}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {/* Required Documents */}
                {procedure.detailedInfo?.requiredDocuments?.[lang]?.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-6 h-6 text-purple-600" />
                            <h2 className="text-gray-900">{translate(uiText.requiredDocuments, lang)}</h2>
                        </div>
                        <ul className="space-y-2">
                            {procedure.detailedInfo.requiredDocuments[lang].map((doc, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5" />
                                    <span className="text-gray-700">{doc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Tips */}
                {procedure.detailedInfo?.tips?.[lang]?.length > 0 && (
                    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg border border-amber-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="w-6 h-6 text-amber-600" />
                            <h2 className="text-gray-900">{translate(uiText.tips, lang)}</h2>
                        </div>
                        <ul className="space-y-2">
                            {procedure.detailedInfo.tips[lang].map((tip, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <span className="text-amber-600 text-lg">💡</span>
                                    <span className="text-gray-700">{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Official Links */}
                {procedure.detailedInfo?.officialLinks && procedure.detailedInfo.officialLinks.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Link className="w-6 h-6 text-green-600" />
                            <h2 className="text-gray-900">{translate(uiText.officialLinks, lang)}</h2>
                        </div>
                        <div className="space-y-3">
                            {procedure.detailedInfo.officialLinks.map((link, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                    <ExternalLink className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-gray-900 mb-1">{translate(link.title, lang)}</p>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm break-all"
                                        >
                                            {link.url}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProcedureDetail;
