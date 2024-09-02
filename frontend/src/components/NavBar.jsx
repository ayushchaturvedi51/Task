import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = false; // Set this based on your authentication logic

    return (
        <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 shadow-lg fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Link className="text-xl font-bold text-yellow-500" to="/">
                    CRIDA
                </Link>
                <button
                    className="lg:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
                <div
                    className={`${
                        isOpen ? "block" : "hidden"
                    } lg:flex lg:items-center lg:w-auto`}
                >
                    <ul className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0 mt-4 lg:mt-0">
                        <li>
                            <Link
                                className="text-white hover:text-gray-300 text-lg"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="text-white hover:text-gray-300 text-lg"
                                to="/dashboard/admin"
                            >
                                Dashboard
                            </Link>
                        </li>
                        {!isLoggedIn && (
                            <>
                                <li>
                                    <Link
                                        className="text-white hover:text-gray-300 text-lg"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-white hover:text-gray-300 text-lg"
                                        to="/signup"
                                    >
                                        Signup
                                    </Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <>
                                <li>
                                    <Link
                                        className="text-white hover:text-gray-300 text-lg"
                                        to="/profile"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="text-white hover:text-gray-300 text-lg"
                                        to="/logout"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
