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
    'obligatory': 'border-red-200 hover:border-red-300 bg-red-50',
    'highly-recommended': 'border-emerald-200 hover:border-emerald-300 bg-emerald-50',
    'optional': 'border-blue-200 hover:border-blue-300 bg-blue-50'
};

const categoryIconColors = {
    'obligatory': 'bg-red-100 text-red-600',
    'highly-recommended': 'bg-emerald-100 text-emerald-600',
    'optional': 'bg-blue-100 text-blue-600'
};

const ProcedureCard = ({ procedure, onStatusChange} ) => {
    const IconComponent = iconMap[procedure.icon] || Circle;

    const toggleStatus = () => {
        onStatusChange(procedure.status === 'todo' ? 'completed' : 'todo');
    };

    return (
        <div
            className={`bg-white rounded-lg border-2 shadow-sm hover:shadow-md transition-all ${
                categoryColors[procedure.category]
            } ${procedure.status === 'completed' ? 'opacity-75' : ''}`}
        >
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
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      {procedure.label}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-gray-900 mb-1">{procedure.title}</h3>
                            {procedure.timeConstraint && (
                                <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 border border-orange-200 rounded px-2 py-1 inline-flex mt-2">
                                    <Clock className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-sm">{procedure.timeConstraint}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-3">{procedure.description}</p>

                {/* Short Summary */}
                {procedure.shortSummary && (
                    <div className="bg-gray-50 rounded px-3 py-2 mb-3">
                        <p className="text-sm text-gray-700">
                            <span className="text-gray-900">Summary:</span> {procedure.shortSummary}
                        </p>
                    </div>
                )}

                {/* Required */}
                {procedure.required && (
                    <div className="bg-gray-50 rounded px-3 py-2 mb-3">
                        <p className="text-sm text-gray-700">
                            <span className="text-gray-900">Required:</span> {procedure.required}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                   <Link
                        to={`/procedures/procedure/${procedure.slug}`}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={toggleStatus}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition-all hover:scale-105 ${
                            procedure.status === 'completed'
                                ? 'text-green-600 bg-green-50 border-green-200'
                                : 'text-gray-400 bg-gray-50 border-gray-200 hover:border-gray-300'
                        } cursor-pointer`}
                    >
                        {procedure.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5" />
                        ) : (
                            <Circle className="w-5 h-5" />
                        )}
                        <span className="text-sm">
                          {procedure.status === 'completed' ? 'Completed' : 'Mark Done'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ProcedureCard
