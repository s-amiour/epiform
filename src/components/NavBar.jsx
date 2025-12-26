// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';  // allows for active link style css
import logo from '../assets/images/logo.svg'
import { Home, Phone, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onNavigateHome, onNavigateContact }) => {
    // const linkClass = ({ isActive }) =>
    //     isActive
    //         ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
    //         : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
    const navigate = useNavigate();

    return (
        <nav
            className="fixed top-0 left-0 right-0 bg-indigo-700 border-b border-blue-500 shadow-sm z-50 transition-transform duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-6">
                        {/*<button*/}
                        {/*    // onClick={onToggleSidebar}*/}
                        {/*    className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"*/}
                        {/*>*/}
                        {/*    /!*{sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}*!/*/}
                        {/*</button>*/}

                        <a className="flex flex-shrink-0 items-center mr-4" href="/">
                            <img
                                className="h-10 w-auto"
                                src={logo}
                                alt="React Jobs"
                            />
                            <h2 className="text-gray-100 ml-1 font-mono">epiform</h2>
                        </a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={()=> navigate('/')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-100 hover:bg-indigo-600 transition-colors cursor-pointer"
                        >
                            <Home className="w-5 h-5" />
                            <span className="hidden sm:inline font-mono">Home</span>
                        </button>

                        <button
                            onClick={()=> navigate('/contact')}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-100 hover:bg-indigo-600 transition-colors cursor-pointer"
                        >
                            <Phone className="w-5 h-5" />
                            <span className="hidden sm:inline font-mono">Contact Us</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
