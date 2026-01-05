// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, Outlet, useOutletContext } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import NavBar from "./components/NavBar.jsx";
import proceduresdata from './proceduresdata.json';
import Hero from "./components/Hero.jsx";
import Dashboard from "./components/Dashboard.jsx";
import ProcedureDetail from "./components/ProcedureDetail.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Procedures from "./components/Procedures.jsx";
import { translate } from "./components/utils/translate";

const STORAGE_KEY = 'paris-student-guide-progress';

// ------------------
// Error Boundary
// ------------------
function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="p-8 text-red-700 bg-red-100 rounded-lg">
        <h2 className="text-lg font-bold mb-2">Something went wrong:</h2>
        <pre className="whitespace-pre-wrap">{error.message}</pre>
      </div>
    );
  }

  return (
    <ErrorBoundaryWrapper onError={setError}>
      {children}
    </ErrorBoundaryWrapper>
  );
}

// Inner wrapper to catch errors using React's componentDidCatch
import React from "react";
class ErrorBoundaryWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    this.props.onError(error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

// ------------------
// Utility to generate slugs
// ------------------
function generateSlug(titleObj) {
  if (!titleObj || !titleObj['en']) return '';
  return titleObj['en'] // always use English
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}


// ------------------
// Outlet Context Hook
// ------------------
function OutletContext() {
  return useOutletContext();
}

// ------------------
// LangWrapper
// ------------------
function LangWrapper() {
  const { lang } = useParams();

  const [procedures, setProcedures] = useState(() => {
    const defaultData = proceduresdata.map(proc => ({
      ...proc,
      slugEn: generateSlug(proc.title, 'en'),
    }));

    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      try {
        const progressData = JSON.parse(savedProgress);
        return defaultData.map(proc => ({
          ...proc,
          status: progressData[proc.id] || proc.status
        }));
      } catch {
        return defaultData;
      }
    }
    return defaultData;
  });

  useEffect(() => {
    const progressData = {};
    procedures.forEach(p => (progressData[p.id] = p.status));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
  }, [procedures]);

  const handleStatusChange = (id, newStatus) => {
    setProcedures(procs => procs.map(p => (p.id === id ? { ...p, status: newStatus } : p)));
  };

  const firstObligatoryProcedure = procedures.find(p => p.category === 'obligatory');

  return (
    <>
      <Outlet context={{ procedures, handleStatusChange, firstObligatoryProcedure, lang }} />
    </>
  );
}

// ------------------
// ProcedureDetailRoute
// ------------------
function ProcedureDetailRoute() {
  const { procedures, handleStatusChange } = OutletContext();
  const { slug, lang } = useParams();

      const procedure = procedures.find(p => p.slugEn === slug);

  if (!procedure) return <div>Procedure not found</div>;

  return (
    <ProcedureDetail
      procedure={procedure}
      allProcedures={procedures}
      onStatusChange={handleStatusChange}
      lang={lang} // pass lang to render translations
    />
  );
}


// ------------------
// ProceduresWrapper
// ------------------
function ProceduresWrapper() {
  const { procedures, handleStatusChange, firstObligatoryProcedure, lang } = OutletContext();
  return (
    <Procedures
      procedures={procedures}
      onStatusChange={handleStatusChange}
      firstObligatoryProcedure={firstObligatoryProcedure}
      lang={lang}
    />
  );
}

// ------------------
// Home Wrapper
// ------------------
function Home() {
  const { procedures, handleStatusChange, firstObligatoryProcedure, lang } = OutletContext();

  // ------------------
  // Frontend Documentation Scrolling Functionality (FDSF)
  // ------------------

  //   use useRef hook to define target element reference; then use ref attribute on that element to allow it to be recognizable
  const frontEndDocSection = useRef(null);

  //   Scroll if not null
  const handleFrontEndDocScroll = () => {
    frontEndDocSection?.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* FDSF Usage */}
      <Hero
        lang={lang}
        scrollToDoc={handleFrontEndDocScroll}
      />
      <Dashboard
        procedures={procedures}
        onStatusChange={handleStatusChange}
        firstObligatoryProcedure={firstObligatoryProcedure}
        lang={lang}
        frontEndDoc={frontEndDocSection}
      />
    </>
  );
}

// ------------------
// ContactWrapper
// ------------------
function ContactWrapper() {
  const { lang } = OutletContext();
  return <ContactUs lang={lang} />;
}

// ------------------
// Main App
// ------------------
function App() {
  const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) root.classList.add("dark");
        else root.classList.remove("dark");
    }, [darkMode]);
  return (
    <ErrorBoundary>
      <Router>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/en" replace />} />

          {/* Language parent route */}
          <Route path="/:lang" element={<LangWrapper />}>
            <Route index element={<Home />} />
            <Route path="procedures" element={<ProceduresWrapper />} />
            <Route path="procedures/procedure/:slug" element={<ProcedureDetailRoute />} />
            <Route path="contact" element={<ContactWrapper />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="" replace />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
