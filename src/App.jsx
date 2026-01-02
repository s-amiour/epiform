import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import proceduresdata from './proceduresdata.json';
import Hero from "./components/Hero.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProcedureDetail from "./components/ProcedureDetail.jsx";
import ContactUs from "./components/ContactUs";
import Procedures from "./components/Procedures.jsx"

import { useState, useEffect, useRef } from "react";

const STORAGE_KEY = 'paris-student-guide-progress';

//creating slugs which are used to be put in the url
function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize("NFD")                 // split accented characters
        .replace(/[\u0300-\u036f]/g, '')  // remove accents
        .replace(/[^a-z0-9]+/g, '-')      // replace non-alphanum with hyphens
        .replace(/(^-|-$)/g, '');         // remove leading/trailing hyphens
}

function App() {
    const [procedures, setProcedures] = useState(() => {
        // Add slug to each procedure
        const defaultData = proceduresdata.map(proc => ({
            ...proc,
            slug: generateSlug(proc.title)
        }));
        const savedProgress = localStorage.getItem(STORAGE_KEY);
        if (savedProgress) {
            try {
                const progressData = JSON.parse(savedProgress);
                return defaultData.map(proc => ({
                    ...proc,
                    status: progressData[proc.id] || proc.status
                }));
            } catch (error) {
                console.error('Error parsing local storage', error);
                return defaultData;
            }
        }

        return defaultData;
    });
    //const [selectedProcedureId, setSelectedProcedureId] = useState(null);

    // const [procedures, setProcedures] = useState(() => {
    //     // Procedures Data
    //     const defaultData = proceduresdata;

    //     // Grab saved progress immediately
    //     const savedProgress = localStorage.getItem(STORAGE_KEY);

    //     if (savedProgress) {
    //         try {
    //             const progressData = JSON.parse(savedProgress);
    //             // 3. Merge saved status into default data
    //             return defaultData.map(proc => ({
    //                 ...proc,
    //                 status: progressData[proc.id] || proc.status
    //             }));
    //         } catch (error) {
    //             console.error('Error parsing local storage', error);
    //             return defaultData;
    //         }
    //     }

    //     // 4. If no storage, just return defaults
    //     return defaultData;
    // });

    // handlesStatusChange(...) runs before useEffect here
    // Save progress to localStorage whenever it changes
    useEffect(() => {
        const progressData = {};
        procedures.forEach(proc => {
            progressData[proc.id] = proc.status;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
    }, [procedures]);

    const handleStatusChange = (id, newStatus) => {
        setProcedures(procedures =>
            procedures.map(proc =>
                proc.id === id ? {...proc, status: newStatus} : proc
            )
        );
    };
    const firstObligatoryProcedure = procedures.find(p => p.category === 'obligatory');

    // Frontend Documentation Scrolling Functionality (FDSF)
    //   use useRef hook to define target element reference; then use ref attribute on that element to allow it to be recognizable
    const frontEndDocSection = useRef(null);

    //   Scroll if not null
    const handleFrontEndDocScroll = () => {
      frontEndDocSection?.current.scrollIntoView({ behavior: "smooth" });
    }


  return (
        <Router>
            <NavBar />
            <div className="pt-16">
                <Routes>
                    {/* Home Route */}
                    <Route path="/" element={
                        <>
                            {/* FDSF: Passed as props*/}
                            <Hero scrollToDoc={handleFrontEndDocScroll} />
                            <Dashboard frontEndDoc={frontEndDocSection} />
                        </>
                    } />
                     {/* Procedures Route */}
                    <Route path="/procedures" element={
                        <>
                            <Procedures
                                procedures={procedures}
                                onStatusChange={handleStatusChange}
                                firstObligatoryProcedure={firstObligatoryProcedure}
                            />
                        </>
                    } />

                    {/* Procedure Route with slug */}
                    <Route path="/procedures/procedure/:slug" element={
                        <ProcedureRouteWrapper
                            procedures={procedures}
                            onStatusChange={handleStatusChange}
                        />
                    } />

                    {/* Contact Route */}
                    <Route path="/contact" element={<ContactUs />} />
                </Routes>
            </div>
        </Router>
    );
}

// Wrapper to extract slug param
function ProcedureRouteWrapper({ procedures, onStatusChange }) {
    const { slug } = useParams();
    const procedure = procedures.find(p => p.slug === slug);

    if (!procedure) return <div>Procedure not found</div>;

    return (
        <ProcedureDetail
            procedure={procedure}
            allProcedures={procedures}
            onStatusChange={onStatusChange}
        />
    );
}

export default App;


//     const navigateToProcedure = (procedureId) => {
//         setSelectedProcedureId(procedureId);
//         setCurrentView('procedure');
//     };

//     const navigateToHome = () => {
//         setSelectedProcedureId(null);
//         setCurrentView('home');
//     };

//     const navigateToContact = () => {
//         setCurrentView('contact');
//     };

//     const selectedProcedure = procedures.find(p => p.id === selectedProcedureId);
    

//     return (
//         <>
//             <NavBar
//                 onNavigateHome={navigateToHome}
//                 onNavigateContact={navigateToContact}
//             />
//             <div className="pt-16">
//                 {currentView === 'home' && (
//                     <div>
//                         <Hero onNavigateContact={navigateToContact}/>

//                         <Dashboard
//                             procedures={procedures}
//                             onStatusChange={handleStatusChange}
//                             onNavigateToProcedure={navigateToProcedure}
//                             firstObligatoryProcedure={firstObligatoryProcedure}
//                         />
//                     </div>
//                 )}

//                 {currentView === 'procedure' && selectedProcedure && (
//                     <ProcedureDetail
//                         procedure={selectedProcedure}
//                         allProcedures={procedures}
//                         onStatusChange={handleStatusChange}
//                         onBack={navigateToHome}
//                     />
//                 )}

//                 {currentView === 'contact' && (
//                     <ContactUs />
//                 )}
//             </div>
//         </>
//     )
// }
// export default App
