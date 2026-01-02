import { Link } from "react-router-dom";
import { ChevronRight } from 'lucide-react';
import GlowOverlay from "./utils/GlowOverlay.jsx";

const Dashboard = ({ frontEndDoc }) => {
    return (
        <>
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 pb-16">

            {/* GlowOverlay is used for the cursor-glow effect found in index.css */}
            <GlowOverlay />
            <main className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              {/* Frontend documentation */}
              <section ref={frontEndDoc} className="text-center mb-16 pt-24">
                <div className="text-3xl md:text-4xl font-bold mb-4">
                  Organize and Follow Your <span
                  className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">Integration Process</span>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Our three categories
                  (Obligatory, Highly Recommended, and Optional) contain thoroughly described cards to push you in the
                  right direction.</p>
              </section>

              <section className="space-y-24">
                <div className="flex flex-col lg:flex-row items-center mb-16">
                  {/*Card 1*/}
                  <div className="w-full lg:w-1/3 lg:pl-8 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      1. <span className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">View Details</span> of desired procedure
                    </h3>
                    <p
                      className="text-lg text-gray-600 dark:text-gray-300 mb-6">Skim through meticulously documented instructions comprising an overview, discussion, steps, required documents, and advice.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Contains official sources and links</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">May contain labels, further precising requirements</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span
                          className="text-gray-600 dark:text-gray-300">Contains warning about possibility of outdatedness</span>
                      </li>
                    </ul>
                  </div>

                  {/*Card 2*/}
                  <div className="w-full lg:w-1/3 lg:pl-8 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    2. <span className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">When task is completed,</span> mark it as done
                    </h3>
                    <p
                      className="text-lg text-gray-600 dark:text-gray-300 mb-6">A specialized button that, thanks to the implementation of saving into the browser's
                      <span className="font-mono"> localStorage</span>, your progress is saved as long as you don't clear the cache.
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Icon alternation using <span className="font-mono"> lucide-react</span> icons</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Hover effect</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span
                          className="text-gray-600 dark:text-gray-300">Make progress without starting over</span>
                      </li>
                    </ul>
                  </div>

                  {/*Card 3*/}
                  <div className="w-full lg:w-1/3 lg:pl-8 mb-4">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    3. <span className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">Watch your progress</span> using the progress bar
                    </h3>
                    <p
                      className="text-lg text-gray-600 dark:text-gray-300 mb-6">Stay on track using the progress bar which updates whenever a task's completion status is changed
                    </p>
                    <ul className="space-y-3 mb-8">
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Seamless movement of green completion bar</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-300">Lists number of completed procedures in each category</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="lucide lucide-chevron-right h-6 w-6 text-[#0033CC] dark:text-[#4F95FF] mr-2 flex-shrink-0" />
                        <span
                          className="text-gray-600 dark:text-gray-300">Progress saved in the browser used</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>


              {/* Call to action */}
              <section className="relative overflow-hidden">
                <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
                  <div
                    className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-800/70 rounded-3xl shadow-xl p-8 md:p-12 border border-blue-100/50 dark:border-blue-900/30">
                    <div className="text-center">
                      <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Follow Your Integration <span
                        className="bg-gradient-to-r from-indigo-700 to-indigo-400 bg-clip-text text-transparent">Into France?</span>
                      </h2>
                      <p
                        className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10">Join other EPITA
                        students who are using <span className="font-mono">epiform</span> to integrate into France.
                      </p>
                      <Link
                        className="inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none h-14 px-8 text-lg bg-[#0033CC] hover:bg-[#002299] text-white shadow-md dark:bg-[#4F95FF] dark:hover:bg-[#3A80EA]"
                        to="/procedures">
                        Begin
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </>
    )
}
export default Dashboard
