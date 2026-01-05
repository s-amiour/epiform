import {
    FileText,
    GraduationCap,
    HeartPulse,
    Landmark,
    Home,
    HandCoins,
    Train,
    Users,
    BookOpen,
    Clock,
    CheckCircle2,
    Circle,
    ArrowRight
} from 'lucide-react';
import { Link } from "react-router-dom";
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";


const iconMap = {
    'passport': FileText,
    'graduation-cap': GraduationCap,
    'heart-pulse': HeartPulse,
    'piggy-bank': Landmark,
    'home': Home,
    'hand-coins': HandCoins,
    'train': Train,
    'users': Users,
    'book-open': BookOpen
};

const categoryColors = {
  obligatory:
    'border-red-200 hover:border-red-300 bg-red-50 ' +
    'dark:border-red-500/40 dark:hover:border-red-400/70 dark:bg-gray-800',

  'highly-recommended':
    'border-emerald-200 hover:border-emerald-300 bg-emerald-50 ' +
    'dark:border-emerald-500/40 dark:hover:border-emerald-400/70 dark:bg-gray-800',

  optional:
    'border-blue-200 hover:border-blue-300 bg-blue-50 ' +
    'dark:border-blue-500/40 dark:hover:border-blue-400/70 dark:bg-gray-800'
};

const categoryIconColors = {
  obligatory: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
  'highly-recommended': 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  optional: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
};

const ProcedureCard = ({ procedure, onStatusChange, lang = 'en' }) => {
    
    const IconComponent = iconMap[procedure.icon] || Circle;

    const toggleStatus = () => {
        onStatusChange(procedure.status === 'todo' ? 'completed' : 'todo');
    };

    return (
        <div
            id={`procedure-${procedure.id}`}
            className={`rounded-lg border-2 shadow-sm hover:shadow-md transition-all
            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
            ${categoryColors[procedure.category]}
            ${procedure.status === 'completed' ? 'opacity-75' : ''}`}>
            <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className={`p-3 rounded-lg ${categoryIconColors[procedure.category]}`}>
                            <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                {procedure.label && (
                                    <span className="
                                        text-xs px-2 py-1 rounded
                                        bg-gray-100 text-gray-600
                                        dark:bg-gray-700 dark:text-gray-200
                                        ">
                                        {translate(procedure.label, lang)}
                                    </span>
                                )}
                            </div>
                            
                            <h3 className="text-gray-900 dark:text-gray-100 mb-1">{translate(procedure.title, lang)}</h3>
                            {procedure.timeConstraint && (
                                <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 border border-orange-200 rounded px-2 py-1 inline-flex mt-2">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm">{translate(procedure.timeConstraint, lang)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-3">{translate(procedure.description, lang)}</p>

                {/* Short Summary */}
                {procedure.shortSummary && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 mb-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-gray-900 dark:text-gray-100">{translate(uitext.summary, lang)}</span> {translate(procedure.shortSummary, lang)}
                        </p>
                    </div>
                )}

                {/* Required */}
                {procedure.required && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 mb-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-gray-900 dark:text-gray-100">{translate(uitext.required, lang)}</span> {translate(procedure.required, lang)}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Link
                    to={`/${lang}/procedures/procedure/${procedure.slugEn}`} // always use English slug
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    >
                    <span>{translate(uitext.viewDetails, lang)}</span>
                    <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                        onClick={toggleStatus}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all hover:scale-105 ${
                            procedure.status === 'completed'
                              ? 'text-green-600 bg-green-50 border-green-200 ' +
                             'dark:text-green-400 dark:bg-green-500/20 dark:border-green-500/40'
                              : 'text-gray-400 bg-gray-50 border-gray-200 hover:border-gray-300 ' +
                                'dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600'
                        } cursor-pointer`}
                    >
                        {procedure.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <Circle className="w-5 h-5" />
                        )}
                        <span className="text-sm">
                        {procedure.status === 'completed' 
                            ? translate(uitext.completedStatus, lang) 
                            : translate(uitext.markDone, lang)}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProcedureCard;
