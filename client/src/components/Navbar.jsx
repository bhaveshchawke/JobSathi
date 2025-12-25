
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7">
                        <div>
                            <Link to="/" className="flex items-center py-4 px-2">
                                <span className="font-semibold text-white text-lg">Betul Jobs</span>
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center space-x-1">
                            <Link to="/" className="py-4 px-2 text-gray-200 hover:text-white transition duration-300">Home</Link>
                            <Link to="/jobs" className="py-4 px-2 text-gray-200 hover:text-white transition duration-300">Find Jobs</Link>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center space-x-3 ">
                        {user ? (
                            <>
                                <span className="text-white font-medium mr-2">Hello, {user.name || 'User'}</span>
                                <button
                                    onClick={handleLogout}
                                    className="py-2 px-2 font-medium text-white bg-red-500 rounded hover:bg-red-600 transition duration-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="py-2 px-2 font-medium text-white hover:bg-indigo-500 rounded transition duration-300">Log In</Link>
                                <Link to="/register" className="py-2 px-2 font-medium bg-white text-indigo-600 rounded hover:bg-gray-100 transition duration-300">Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button className="outline-none mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <svg className="w-6 h-6 text-white"
                                x-show="!showMenu"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden pb-4 px-4`}>
                <Link to="/" className="block py-2 text-sm text-gray-200 hover:text-white transition duration-300">Home</Link>
                <Link to="/jobs" className="block py-2 text-sm text-gray-200 hover:text-white transition duration-300">Find Jobs</Link>
                {user ? (
                    <>
                        <span className="block py-2 text-sm text-white font-medium">Hello, {user.name || 'User'}</span>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left py-2 text-sm text-white bg-red-500 rounded px-2 mt-2"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col space-y-2 mt-2">
                        <Link to="/login" className="block py-2 px-4 text-center text-sm font-medium text-white bg-indigo-500 rounded">Log In</Link>
                        <Link to="/register" className="block py-2 px-4 text-center text-sm font-medium bg-white text-indigo-600 rounded">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
