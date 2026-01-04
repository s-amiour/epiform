import { Link } from "react-router-dom";
import { ChevronRight } from 'lucide-react';
import GlowOverlay from "./utils/GlowOverlay.jsx";
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";

const Dashboard = ({ frontEndDoc, lang = 'en' }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 pb-16">
      <GlowOverlay />

      <main className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 scroll-pt-16">

        {/* Frontend documentation */}
        <section ref={frontEndDoc} className="text-center mb-16 pt-24">
          <div className="text-3xl md:text-4xl font-bold mb-4">
            {translate(uitext.organizeIntegration, lang).split('<highlight>').map((part, i) =>
              part.includes('</highlight>') ? (
                <span
                  key={i}
                  className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent"
                >
                  {part.replace('</highlight>', '')}
                </span>
              ) : part
            )}
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {translate(uitext.integrationDescription, lang)}
          </p>
        </section>

        {/* Steps section */}
        <section className="space-y-24">
          {/* Wrap all cards in a single flex container to match old layout */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center mb-16">
            {[1, 2, 3].map((cardNumber) => {
              const stepTitle = translate(uitext[`step${cardNumber}`], lang);
              const stepDesc = translate(uitext[`step${cardNumber}Desc`], lang);
              const stepList = uitext[`step${cardNumber}List`]?.[lang] || [];

              return (
                <div key={cardNumber} className="w-full lg:w-1/3 lg:pl-8 mb-8 lg:mb-0">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {stepTitle.split('<highlight>').map((part, i) =>
                      part.includes('</highlight>') ? (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent"
                        >
                          {part.replace('</highlight>', '')}
                        </span>
                      ) : part
                    )}
                  </h3>

                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{stepDesc}</p>

                  <ul className="space-y-3 mb-8">
                    {stepList.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight className="h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">{translate(item, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to action */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/70 rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100/50 dark:border-blue-900/30">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {translate(uitext.readyIntegration, lang).split('<highlight>').map((part, i) =>
                    part.includes('</highlight>') ? (
                      <span
                        key={i}
                        className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent"
                      >
                        {part.replace('</highlight>', '')}
                      </span>
                    ) : part
                  )}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">
                  {translate(uitext.joinStudents, lang)}
                </p>
                <Link
                  className="inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none h-14 px-8 text-lg bg-[#0033CC] hover:bg-[#002299] text-white shadow-md dark:bg-[#4F95FF] dark:hover:bg-[#3A80EA]"
                  to={`/${lang}/procedures`}
                >
                  {translate(uitext.begin, lang)}
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Dashboard;
