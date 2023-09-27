import { useState, useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function Navbar() {
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const [dropdown, setDropdown] = useState(false);
	const { user } = useContext(AuthContext);

	const handleProfileDropdown = () => {
		setDropdown(false);
		setShowProfileDropdown(!showProfileDropdown);
	};

	const handleDropdown = () => {
		setShowProfileDropdown(false);
		setDropdown(!dropdown);
	};

	const profileDropdownRef = useRef(null);
	const buttonRef = useRef(null);
	const dropdownRef = useRef(null);
	const dropdownBtnRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				profileDropdownRef.current &&
				!profileDropdownRef.current.contains(e.target) &&
				!buttonRef.current.contains(e.target)
			) {
				setShowProfileDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target) &&
				!dropdownBtnRef.current.contains(e.target)
			) {
				setDropdown(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<nav className="bg-black border-gray-200">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<NavLink to="/" className="flex items-center">
					{/*<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8 mr-3"
						alt="Flowbite Logo"
	/>*/}
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-300">
						Slink
					</span>
				</NavLink>
				<div className="flex items-center md:order-2 relative">
					{!user?.isAuthenticated && (
						<NavLink
							to="/login"
							className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-2"
						>
							Login
						</NavLink>
					)}
					{user?.isAuthenticated && (
						<>
							<button
								type="button"
								ref={buttonRef}
								onClick={handleProfileDropdown}
								className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
								id="user-menu-button"
								aria-expanded="false"
								data-dropdown-toggle="user-dropdown"
								data-dropdown-placement="bottom"
							>
								<span className="sr-only">Open user menu</span>
								<img
									className="w-8 h-8 rounded-full"
									src={`https://robohash.org/${user?.email}`}
									alt="user photo"
								/>
							</button>
							<div
								ref={profileDropdownRef}
								className={`z-50 ${
									showProfileDropdown ? "" : "hidden"
								} my-4 text-base list-none text-gray-300 divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-10 border bg-white`}
								id="user-dropdown"
							>
								<div className="px-4 py-3">
									<span className="block text-sm text-gray-300 ">
										{user?.username}
									</span>
									<span className="block text-sm  text-gray-500 truncate ">
										{user?.email}
									</span>
								</div>
								<ul className="py-2" aria-labelledby="user-menu-button">
									<li>
										<NavLink
											to="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Settings
										</NavLink>
									</li>
									<li>
										<NavLink
											to="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Sign out
										</NavLink>
									</li>
								</ul>
							</div>{" "}
						</>
					)}
					{user?.isAuthenticated && (
						<button
							ref={dropdownBtnRef}
							data-collapse-toggle="navbar-user"
							type="button"
							onClick={handleDropdown}
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
							aria-controls="navbar-user"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					)}
				</div>
				{user?.isAuthenticated && (
					<div
						ref={dropdownRef}
						className={`items-center justify-between ${
							dropdown ? "flex" : "hidden"
						} w-full md:flex md:w-auto md:order-1 relative`}
						id="navbar-user"
					>
						<ul className="absolute right-0 top-2 z-50 md:relative flex flex-col font-medium p-4 md:p-0 mt-4 bg-black md:bg-transparent border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
							<li>
								<NavLink
									to={`/${user?.username}`}
									className="block py-2 pl-3 pr-4 text-gray-300 bg-purple-700 rounded md:bg-transparent md:p-0"
									aria-current="page"
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`${user?.username}/dashboard`}
									className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
								>
									Dashboard
								</NavLink>
							</li>
							<li>
								<NavLink
									to="#"
									className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
								>
									Services
								</NavLink>
							</li>
							<li>
								<NavLink
									to="#"
									className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
								>
									Contact
								</NavLink>
							</li>
						</ul>
					</div>
				)}
			</div>
		</nav>
	);
}

export default Navbar;
