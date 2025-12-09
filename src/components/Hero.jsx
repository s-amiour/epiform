import { AlertTriangle, Phone } from 'lucide-react'

const Hero = ({ onNavigateContact }) => {
    return (
        <>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    {/* Welcome Header */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                        <h1 className="text-indigo-600 mb-4 font-bold">Welcome to EPITA Kremlin-Bicêtre! 🇫🇷</h1>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            This comprehensive guide will help you navigate the essential procedures for settling in France as an international EPITA student.
                            We've organized everything you need to know into clear categories, from mandatory administrative tasks to helpful recommendations
                            that will make your transition smoother.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Each procedure includes detailed step-by-step instructions, required documents, official links, and practical tips from
                            students who've been through the process. Your progress is automatically saved in your browser, so you can complete
                            tasks at your own pace.
                        </p>
                    </div>

                    {/* Warning Section */}
                    <div className="bg-red-50 border-2 border-orange-400 rounded-lg p-6 mb-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-orange-900 mb-2 font-bold text-2xl">Important Notice</h3>
                                <p className="text-orange-800 leading-relaxed mb-4">
                                    Administrative procedures in France are subject to change. While we strive to keep this information current,
                                    regulations, fees, deadlines, and processes may be modified by French authorities. Always verify critical
                                    information on official government websites and consult with EPITA's international student office for the
                                    most up-to-date guidance.

                                    In the case of any outdated information found, please signal us directly via the following page:
                                </p>
                                <section className="m-auto max-w-lg px-1">
                                <a
                                    onClick={onNavigateContact}
                                    className="flex justify-center items-center gap-2 bg-orange-950 text-orange-50 shadow-md font-semibold text-center py-3 px-6 rounded-xl hover:bg-orange-900 cursor-pointer"
                                >
                                    <Phone className="w-5 h-5 text-red-600" />
                                    Contact Us</a
                                >
                            </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Hero
