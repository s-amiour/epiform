import { AlertTriangle, Phone, ArrowLeft, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import uitext from "./utils/uitext";
import { translate } from "./utils/translate";

const Hero = ({ scrollToDoc, lang = 'en' }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="bg-gradient-to-r from-indigo-50 to-indigo-100
                dark:from-gray-900 dark:to-gray-800
                pt-5 pb-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                    
                    {/* Face Header */}
                    <div className="text-center mt-6 mb-12 pt-12">
                      <svg className="w-12 h-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path fill="#312e81" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM216 128C202.7 128 192 138.7 192 152C192 165.3 202.7 176 216 176L264 176C277.3 176 288 165.3 288 152C288 138.7 277.3 128 264 128L216 128zM216 224C202.7 224 192 234.7 192 248C192 261.3 202.7 272 216 272L264 272C277.3 272 288 261.3 288 248C288 234.7 277.3 224 264 224L216 224zM286.3 384C275 384 264.4 389.1 257.4 397.9L197.3 473C189 483.3 190.7 498.5 201 506.7C211.3 514.9 226.5 513.3 234.7 502.9L281.8 444.1L297 494.8C300 505 309.4 511.9 320 511.9L424 511.9C437.3 511.9 448 501.2 448 487.9C448 474.6 437.3 463.9 424 463.9L337.9 463.9L321.8 410.3C317.1 394.6 302.7 383.9 286.3 383.9z"/>
                      </svg>

                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-900 dark:text-gray-100 mb-4">
                         {translate(uitext.heroHeading, lang).split('<highlight>').map((part, i) => 
                              part.includes('</highlight>') ? (
                              <span key={i} className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
                                {part.replace('</highlight>', '')}
                              </span>
                            ) : part
                        )}
                      </h1>

                      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                        {translate(uitext.heroSubHeading, lang)
                          .split('<highlight>')
                          .map((part, i) =>
                            part.includes('</highlight>') ? (
                              <span key={i} className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">
                                {part.replace('</highlight>', '')}
                              </span>
                            ) : part
                        )}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Link 
                          className="inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none h-12 px-6 text-base bg-[#0033CC] hover:bg-[#002299] text-white shadow-md dark:bg-[#4F95FF] dark:hover:bg-[#3A80EA]" 
                          to={`/${lang}/procedures`}
                        >
                          {translate(uitext.heroSeeProcedures, lang)}
                        </Link>

                        <button
                          className="inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none h-12 px-6 text-base bg-white hover:bg-gray-50 text-[#0033CC] border border-[#0033CC]/20 shadow-sm dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-[#4F95FF] dark:border-[#4F95FF]/20 cursor-pointer"
                          onClick={scrollToDoc}
                        >
                          {translate(uitext.heroHowToUse, lang)}
                          <ChevronDown className="ml-2 w-4 h-4"/>
                        </button>
                      </div>
                    </div>

                    {/* Welcome Header */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
                        <h1 className="text-[#0033CC] dark:text-[#4F95FF] mb-4 font-bold">
                          {translate(uitext.heroWelcome, lang)}
                        </h1>

                        <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                          {translate(uitext.heroWelcomeDesc1, lang)}
                        </p>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {translate(uitext.heroWelcomeDesc2, lang)}
                        </p>
                    </div>

                    {/* Warning Section */}
                    <div className="bg-red-50 dark:bg-red-900 border-2 border-orange-400 dark:border-orange-700 rounded-lg p-6 mb-16">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-300 flex-shrink-0 mt-1" />

                          <div>
                            <h3 className="text-[#7e2a0c] dark:text-orange-200 mb-2 font-bold text-2xl">
                              {translate(uitext.heroImportantNotice, lang)}
                            </h3>

                            <p className="text-orange-800 dark:text-orange-200 leading-relaxed mb-4">
                              {translate(uitext.heroImportantNoticeDesc, lang)}
                            </p>

                            <section className="m-auto px-1 flex justify-center">
                              <button
                                onClick={() => navigate(`/${lang}/contact`)}
                                className="flex justify-center items-center w-full gap-2 bg-[#441306] dark:bg-[#6A2C1F] text-orange-50 shadow-md font-semibold text-center py-3 px-6 rounded-xl hover:bg-[#542214] dark:hover:bg-[#7F3B2B] cursor-pointer"
                              >
                                <Phone className="w-5 h-5 text-red-600 dark:text-red-400" />
                                {translate(uitext.contactUs, lang)}
                              </button>
                            </section>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
        </>
    )
}

export default Hero;
