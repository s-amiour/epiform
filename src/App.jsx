// import {
//     Route,  // to define route
//     createBrowserRouter,  // create router in browser
//     createRoutesFromElements,
//     RouterProvider,  // provides router for routing; needed for <Route /> to work
// } from 'react-router-dom'
//
// import HomePage from './pages/HomePage'
// import MainLayout from "./layouts/MainLayout";
// import JobsPage from "./pages/JobsPage";
// import NotFoundPage from "./pages/NotFoundPage.jsx";
// import JobPage, { jobLoader } from "./pages/JobPage";
//
//
// let router = createBrowserRouter(
//     createRoutesFromElements(
//         // ROUTES
//         // MainLayout is being applied
//         <Route path='/' element={ <MainLayout /> }>  {/*index path*/}
//             <Route index element={ <HomePage /> } />
//             <Route path='/jobs' element={ <JobsPage /> } />
//             {/*The colon signifies that it's variable is dynamic*/}
//             <Route path='/jobs/:id' element={ <JobPage /> } loader={jobLoader} />
//             <Route path='*' element={ <NotFoundPage /> } />  {/* The asterisk catches all pages */}
//             {/*<Route path='/about'   element={ <HomePage /> } />*/}
//
//         </Route>
//     )
// )


import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";


function App() {
    return (
        <>
            <NavBar />
            <Hero />
        </>
    )
}

export default App
