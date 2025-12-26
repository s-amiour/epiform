import NavBar from "./components/NavBar.jsx";
import proceduresdata from './proceduresdata.json';
import Hero from "./components/Hero.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProcedureDetail from "./components/ProcedureDetail.jsx";
import ContactUs from "./components/ContactUs";

import { useState, useEffect } from "react";

const STORAGE_KEY = 'paris-student-guide-progress';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [selectedProcedureId, setSelectedProcedureId] = useState(null);

    const [procedures, setProcedures] = useState(() => {
        // Procedures Data
        const defaultData = proceduresdata;

        // Grab saved progress immediately
        const savedProgress = localStorage.getItem(STORAGE_KEY);

        if (savedProgress) {
            try {
                const progressData = JSON.parse(savedProgress);
                // 3. Merge saved status into default data
                return defaultData.map(proc => ({
                    ...proc,
                    status: progressData[proc.id] || proc.status
                }));
            } catch (error) {
                console.error('Error parsing local storage', error);
                return defaultData;
            }
        }

        // 4. If no storage, just return defaults
        return defaultData;
    });

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


    const navigateToProcedure = (procedureId) => {
        setSelectedProcedureId(procedureId);
        setCurrentView('procedure');
    };

    const navigateToHome = () => {
        setSelectedProcedureId(null);
        setCurrentView('home');
    };

    const navigateToContact = () => {
        setCurrentView('contact');
    };

    const selectedProcedure = procedures.find(p => p.id === selectedProcedureId);
    const firstObligatoryProcedure = procedures.find(p => p.category === 'obligatory');

    return (
        <>
            <NavBar
                onNavigateHome={navigateToHome}
                onNavigateContact={navigateToContact}
            />
            <div className="pt-16">
                {currentView === 'home' && (
                    <div>
                        <Hero onNavigateContact={navigateToContact}/>

                        <Dashboard
                            procedures={procedures}
                            onStatusChange={handleStatusChange}
                            onNavigateToProcedure={navigateToProcedure}
                            firstObligatoryProcedure={firstObligatoryProcedure}
                        />
                    </div>
                )}

                {currentView === 'procedure' && selectedProcedure && (
                    <ProcedureDetail
                        procedure={selectedProcedure}
                        allProcedures={procedures}
                        onStatusChange={handleStatusChange}
                        onBack={navigateToHome}
                    />
                )}

                {currentView === 'contact' && (
                    <ContactUs />
                )}
            </div>
        </>
    )
}
export default App
