import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";

const ContactUs = ({ lang = 'en' }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const goBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate(`/${lang}`); // fallback to Dashboard in current language
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm sticky top-5 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-16">
    {/* Back button flush left */}
    <div className="self-start mb-4">
      <button
        onClick={goBack}
        className="inline-flex items-center gap-2 text-base text-gray-600 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5" />
        {translate(uitext.back, lang)}
      </button>
    </div>

    {/* Centered header */}
    <div className="text-center">
      <h1 className="text-xl sm:text-xl lg:text-6xl font-extrabold text-indigo-700 mb-4">
        {translate(uitext.contactUs, lang)}
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
        {translate(uitext.contactUsDescription, lang)}
      </p>
    </div>

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
                            <h2 className="text-gray-900">{translate(uitext.emailUs, lang)}</h2>
                        </div>
                        <p className="text-gray-600 mb-4">{translate(uitext.emailDescription, lang)}</p>
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
                            <h2 className="text-gray-900">{translate(uitext.callUs, lang)}</h2>
                        </div>
                        <p className="text-gray-600 mb-4">{translate(uitext.callUsDescription, lang)}</p>
                        <a href="tel:+33184071690" className="text-indigo-600 hover:underline inline-flex items-center gap-2">
                            <Phone className="w-4 h-4" /> +33 1 84 07 16 90
                        </a><br />
                        <a href="tel:+33184071606" className="text-indigo-600 hover:underline inline-flex items-center gap-2">
                            <Phone className="w-4 h-4" /> +33 1 84 07 16 06
                        </a><br />
                        <a href="tel:+33184071618" className="text-indigo-600 hover:underline inline-flex items-center gap-2">
                            <Phone className="w-4 h-4" /> +33 1 84 07 16 18
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
                            <h2 className="text-gray-900">{translate(uitext.visitOffice, lang)}</h2>
                            <div className="text-red-800 space-y-1">{translate(uitext.visitNote, lang)}</div>
                        </div>
                    </div>
                    <p className="text-gray-700 mb-3">{translate(uitext.officeEmailIntro, lang)}</p>
                    <div className="text-red-800 space-y-1">
                        <p>{translate(uitext.academicEmail, lang)}</p>
                        <p>{translate(uitext.adminEmail, lang)}</p>
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
                        <h2 className="text-gray-900">{translate(uitext.officeHours, lang)}</h2>
                    </div>
                    <div className="space-y-2 text-gray-700">
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span>{translate(uitext.mondayWedFri, lang)}</span>
                            <span>10:00 AM - 12:00 PM</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-gray-100">
                            <span>{translate(uitext.tueThu, lang)}</span>
                            <span>15:00 PM - 17:00 PM</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>{translate(uitext.weekend, lang)}</span>
                            <span className="text-gray-500">{translate(uitext.closed, lang)}</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        {translate(uitext.holidayHours, lang)}
                    </p>
                </div>

                {/* Additional Suggestions */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-600 rounded-lg p-6 text-white">
                    <div className="flex items-center gap-3 mb-4">
                        <MessageCircle className="w-6 h-6" />
                        <h2 className="text-white">{translate(uitext.additionalSuggestions, lang)}</h2>
                    </div>
                    <div className="space-y-3">
                        <p className="text-indigo-100">{translate(uitext.quickQuestions, lang)}</p>
                        <ul className="space-y-2 text-indigo-50">
                            <li>{translate(uitext.suggestion1, lang)}</li>
                            <li>{translate(uitext.suggestion2, lang)}</li>
                            <li>{translate(uitext.suggestion3, lang)}</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
