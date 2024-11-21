import React, { useState } from 'react';
import { FiHome, FiUser, FiMenu, FiLogOut } from 'react-icons/fi';
import { ImStatsDots } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { apiLogout } from '../api/user';

export default function Nav({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="flex">
			{/* Sidebar */}
			<div
				className={`transition-width flex h-screen flex-col bg-gray-800 p-5 text-white duration-300 ${
					isOpen ? 'w-64' : 'w-16'
				}`}
			>
				{/* Logo and Menu Button */}
				<div className="flex items-center justify-between">
					<div
						className={`text-xl font-bold ${!isOpen && 'hidden'} transition duration-300`}
					>
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
						to="/welcome"
					/>
					<NavItem
						icon={<FiUser />}
						label="Profile"
						isOpen={isOpen}
						to="/profile"
					/>
					<NavItem
						icon={<ImStatsDots />}
						label="Statistics"
						isOpen={isOpen}
						to="/statistics"
					/>
					<Logout isOpen={isOpen} />
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-grow bg-gray-100 p-6">{children}</div>
		</div>
	);
}

const NavItem = ({ icon, label, isOpen, to }) => (
	<Link
		to={to}
		className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white ${isOpen && 'px-3'} rounded-lg py-2`}
	>
		<span className="text-xl">{icon}</span>
		{isOpen && <span className="ml-4">{label}</span>}
	</Link>
);

const Logout = ({ isOpen }) => {
    const logout = async() => {
        await apiLogout();
    }
	return (
		<Link
			to={'/login'}
            onCLick={logout}
			className={`flex items-center text-gray-300 hover:bg-gray-700 hover:text-white ${isOpen && 'px-3'} rounded-lg py-2`}
		>
			<span className="text-xl">{<FiLogOut />}</span>
			{isOpen && <span className="ml-4">{'Logout'}</span>}
		</Link>
	);
};
