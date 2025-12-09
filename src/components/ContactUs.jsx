import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

const ContactUs = () => {
    return (
        <div className="bg-gradient-to-r from-indigo-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-indigo-600 font-bold">Contact Us</h1>
                    <p className="text-gray-600 mt-2">We're here to help students like you to settle in Paris. Notify us immediately if you find any outdated information</p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Contact Methods Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Email */}
                    <div className="bg-red-50 rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-red-100 rounded-lg">
                                <Mail className="w-6 h-6 text-red-900" />
                            </div>
                            <h2 className="text-gray-900">Email Us</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            For general inquiries, bugs, and detailed update requests. We typically respond within 24-48 hours.
                        </p>
                        <a
                            href="mailto:joseph.ayoub@epita.fr"
                            className="text-indigo-600 hover:underline inline-flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            joseph.ayoub@epita.fr
                        </a>
                    </div>

                    {/* Phone */}
                    <div className="bg-green-50 rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Phone className="w-6 h-6 text-green-600" />
                            </div>
                            <h2 className="text-gray-900">Call Us</h2>
                        </div>
                        <p className="text-gray-600 mb-4">
                            For urgent matters and assistance, please call the EPITA International Office during office hours.
                        </p>
                        <a
                            href="tel:+33184071690"
                            className="text-indigo-600 hover:underline inline-flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            +33 1 84 07 16 90
                        </a><br />

                        <a
                            href="tel:+33184071606"
                            className="text-indigo-600 hover:underline inline-flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            +33 1 84 07 16 06
                        </a><br />

                        <a
                            href="tel:+33184071618"
                            className="text-indigo-600 hover:underline inline-flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" />
                            +33 1 84 07 16 18
                        </a>
                    </div>
                </div>

                {/* Office Location */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <MapPin className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-sm">
                            <h2 className="text-gray-900">Visit EPITA International Office</h2>
                            <div className="text-red-800 space-y-1">Note that this office does not pertain to us</div>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-3">To email the EPITA Intl. Office or to book an appointment during office hours, use one of two emails:</p>
                    <div className="text-red-800 space-y-1">
                        <p>For academic and internship inquiries: international-scolarite@epita.fr</p>
                        <p>For administrative and housing related inquiries: welcome-services@epita.fr</p>
                        <p></p>
                    </div>

                    <div className="text-gray-600 space-y-1">
                        <p>EPITA - École d'Ingénieurs en Intelligence Informatique</p>
                        <p>14-16 Rue Voltaire</p>
                        <p>94270 Le Kremlin-Bicêtre, France</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                        Metro: Line 7 - Le Kremlin-Bicêtre station
                    </p>
                </div>

                {/* Office Hours */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                            <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <h2 className="text-gray-900">EPITA Intl. Office Hours</h2>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span>Monday, Wednesday, Friday:</span>
                            <span>10:00 AM - 12:00 PM</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span>Tuesday, Thursday:</span>
                            <span>15:00 PM - 17:00 PM</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Saturday - Sunday:</span>
                            <span className="text-gray-500">Closed</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        During French school holidays, office hours may be reduced. Please check the website or call ahead.
                    </p>
                </div>

                {/* Additional Suggestions */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <MessageCircle className="w-6 h-6" />
                        <h2 className="text-white">Additional Suggestions</h2>
                    </div>
                    <div className="space-y-3">
                        <p className="text-indigo-100">
                            For quick questions, you can also reach out through:
                        </p>
                        <ul className="space-y-2 text-indigo-50">
                            <li>• Your batch's student Whatsapp / Discord group (if any)</li>
                            <li>• Student buddy program (assigned upon arrival)</li>
                            <li>• Campus France office (for visa-related questions)</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default ContactUs
