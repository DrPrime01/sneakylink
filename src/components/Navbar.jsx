import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function Navbar() {
	const [showProfileDropdown, setShowProfileDropdown] = useState(false);
	const { user } = useContext(AuthContext);
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
								onClick={() => setShowProfileDropdown(!showProfileDropdown)}
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
											to={`${user?.username}/dashboard`}
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Dashboard
										</NavLink>
									</li>
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
					<button
						data-collapse-toggle="navbar-user"
						type="button"
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
				</div>
				{user?.isAuthenticated && (
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-user"
					>
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
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
									to="#"
									className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
								>
									About
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
