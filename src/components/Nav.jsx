import React, { useState } from "react";
import { FiHome, FiUser, FiSettings, FiMenu, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Nav({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div
                className={`bg-gray-800 text-white h-screen p-5 flex flex-col transition-width duration-300 ${isOpen ? "w-64" : "w-16"
                    }`}
            >
                {/* Logo and Menu Button */}
                <div className="flex items-center justify-between">
                    <div className={`text-xl font-bold ${!isOpen && "hidden"} transition duration-300`}>
                        MyApp
                    </div>
                    <button
                        className="text-gray-400 hover:text-white"
                        onClick={toggleSidebar}
                    >
                        <FiMenu size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="mt-10 space-y-4">
                    <NavItem
                        icon={<FiHome />}
                        label="Home"
                        isOpen={isOpen}
                        to="/"
                    />
                    <NavItem
                        icon={<FiUser />}
                        label="Profile"
                        isOpen={isOpen}
                        to="/profile"
                    />
                    <NavItem
                        icon={<FiSettings />}
                        label="Settings"
                        isOpen={isOpen}
                        to="/statistics"
                    />
                    <NavItem
                        icon={<FiLogOut />}
                        label="Logout"
                        isOpen={isOpen}
                        to="/login"
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6 bg-gray-100">
                {children}
            </div>
        </div>
    );
};

const NavItem = ({ icon, label, isOpen, to }) => (
    <Link
        to={to}
        className={`flex items-center text-gray-300 hover:text-white hover:bg-gray-700 ${ isOpen && 'px-3'} py-2 rounded-lg`}
    >
        <span className="text-xl">{icon}</span>
        {isOpen && <span className="ml-4">{label}</span>}
    </Link>
);

