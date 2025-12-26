import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, ArrowRight, OctagonAlert, Sparkle, ClipboardList } from 'lucide-react';
import ProcedureCard from './ProcedureCard';
const Dashboard = ({ procedures, onStatusChange, onNavigateToProcedure, firstObligatoryProcedure }) => {
    const [expandedCategory, setExpandedCategory] = useState(() => {
    return sessionStorage.getItem('expandedCategory') || 'obligatory';
});

    // Procedures grouped into three categories
    const obligatoryProcedures = procedures.filter(p => p.category === 'obligatory');
    const highlyRecommendedProcedures = procedures.filter(p => p.category === 'highly-recommended');
    const optionalProcedures = procedures.filter(p => p.category === 'optional');

    // Progress data
    const completedObligatory = obligatoryProcedures.filter(p => p.status === 'completed').length;
    const completedHighlyRecommended = highlyRecommendedProcedures.filter(p => p.status === 'completed').length;
    const completedOptional = optionalProcedures.filter(p => p.status === 'completed').length;
    const totalCompleted = completedObligatory + completedHighlyRecommended + completedOptional;
    const totalProcedures = procedures.length;
    const progressPercentage = (totalCompleted / totalProcedures) * 100;
    const obligatoryRef = useRef(null);
    const highlyRecommendedRef = useRef(null);
    const optionalRef = useRef(null);

    const toggleCategory = (category) => {
    const newCategory = expandedCategory === category ? null : category;
    setExpandedCategory(newCategory);
    sessionStorage.setItem('expandedCategory', newCategory);
    if (newCategory) {
            // Delay slightly to ensure DOM has updated
            setTimeout(() => {
                let ref;
                if (newCategory === 'obligatory') ref = obligatoryRef;
                else if (newCategory === 'highly-recommended') ref = highlyRecommendedRef;
                else if (newCategory === 'optional') ref = optionalRef;

                ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Get Started CTA */}
                    {firstObligatoryProcedure && (
                        <div className="bg-gradient-to-r  from-indigo-700 to-indigo-950 rounded-lg p-6 mb-8 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-white mb-2">Ready to Get Started?</h2>
                                    <p className="text-blue-100">
                                        Begin with the first essential step every international student must complete
                                    </p>
                                </div>
                                <Link
                                    to={`/procedure/${firstObligatoryProcedure.slug}`}
                                    className="bg-gray-200 text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
                                    >
                                    <span>Start Here</span>
                                    <ArrowRight className="w-5 h-5" />
                                    </Link>
                            </div>
                        </div>
                    )}

                    {/* Progress Tracker */}
                    <div className="bg-indigo-950 rounded-lg shadow-sm border border-gray-800 p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-gray-100">Your Progress</h2>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <span className="text-gray-300">{totalCompleted} of {totalProcedures} completed</span>
                            </div>
                        </div>
                        <div className="w-full h-3 bg-gray-400 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }} // Width of green bar is determined by percentage of completion of procedures
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="text-center">
                                <p className="text-sm text-gray-400">Obligatory</p>
                                <p className="text-gray-100">{completedObligatory}/{obligatoryProcedures.length}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-400">Highly Recommended</p>
                                <p className="text-gray-100">{completedHighlyRecommended}/{highlyRecommendedProcedures.length}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-400">Optional</p>
                                <p className="text-gray-100">{completedOptional}/{optionalProcedures.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Obligatory Procedures Section */}
                    <div className="mb-6" ref={obligatoryRef}>
                        <button
                            onClick={() => toggleCategory('obligatory')}
                            className="w-full bg-white rounded-lg shadow-sm border-2 border-red-200 p-4 hover:border-red-300 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl"><OctagonAlert className="w-5 h-5 text-gray-700"/></span>
                                    <div className="text-left">
                                        <h2 className="text-gray-900">Obligatory Procedures</h2>
                                        <p className="text-sm text-gray-600">Essential tasks required by French law - must complete all</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">{completedObligatory}/{obligatoryProcedures.length} completed</span>
                                    {expandedCategory === 'obligatory' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {expandedCategory === 'obligatory' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                                {obligatoryProcedures.map(procedure => (
                                    <ProcedureCard
                                        key={procedure.id}
                                        procedure={procedure}
                                        onStatusChange={(newStatus) => onStatusChange(procedure.id, newStatus)}
                                       />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Highly Recommended Procedures Section */}
                    <div className="mb-6" ref={highlyRecommendedRef}>
                        <button
                            onClick={() => toggleCategory('highly-recommended')}
                            className="w-full bg-white rounded-lg shadow-sm border-2 border-emerald-200 p-4 hover:border-emerald-300 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl"><Sparkle className="w-5 h-5 text-gray-700"/></span>
                                    <div className="text-left">
                                        <h2 className="text-gray-900">Highly Recommended</h2>
                                        <p className="text-sm text-gray-600">Strongly advised procedures that significantly improve your experience</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">{completedHighlyRecommended}/{highlyRecommendedProcedures.length} completed</span>
                                    {expandedCategory === 'highly-recommended' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {expandedCategory === 'highly-recommended' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                                {highlyRecommendedProcedures.map(procedure => (
                                    <ProcedureCard
                                        key={procedure.id}
                                        procedure={procedure}
                                        onStatusChange={(newStatus) => onStatusChange(procedure.id, newStatus)}
                                        />
                                ))}
                            </div>
                        )}
                    </div>
                        
                    {/* Optional Procedures Section */}
                    <div className="mb-6" ref={optionalRef}>
                        <button
                            onClick={() => toggleCategory('optional')}
                            className="w-full bg-white rounded-lg shadow-sm border-2 border-blue-200 p-4 hover:border-blue-300 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl"><ClipboardList className="w-5 h-5 text-gray-700"/></span>
                                    <div className="text-left">
                                        <h2 className="text-gray-900">Optional Procedures</h2>
                                        <p className="text-sm text-gray-600">Helpful but not required - enhance your student life experience</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500">{completedOptional}/{optionalProcedures.length} completed</span>
                                    {expandedCategory === 'optional' ? (
                                        <ChevronUp className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-gray-400" />
                                    )}
                                </div>
                            </div>
                        </button>

                        {expandedCategory === 'optional' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                                {optionalProcedures.map(procedure => (
                                    <ProcedureCard
                                        key={procedure.id}
                                        procedure={procedure}
                                        onStatusChange={(newStatus) => onStatusChange(procedure.id, newStatus)}
                                        />
                                ))}
                            </div>
                        )}


                        {/* Emergency Numbers */}
                        <div className="bg-red-50 border border-red-200 rounded-lg p-5 mt-6">
                            <div className="text-red-900">
                                <p className="font-bold text-lg mb-1">Emergency Numbers</p>
                                <p className="mb-2">
                                    For urgent emergencies, call the suitable emergency number(s):
                                </p>
                                <ul className="list-disc list-inside space-y-1 font-medium">
                                    <li>
                                        <span className="font-bold">112</span>: European Emergency Number (General)
                                    </li>
                                    <li>
                                        <span className="font-bold">15</span>: SAMU (Medical Emergencies)
                                    </li>
                                    <li>
                                        <span className="font-bold">17</span>: Police / Gendarmerie
                                    </li>
                                    <li>
                                        <span className="font-bold">18</span>: Fire Brigade (Sapeurs-Pompiers)
                                    </li>
                                    <li>
                                        <span className="font-bold">114</span>: Emergency for deaf/hard of hearing (SMS)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard
