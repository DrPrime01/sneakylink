function Navbar() {
	return (
		<nav className="bg-black border-gray-200">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a href="https://flowbite.com/" className="flex items-center">
					{/*<img
						src="https://flowbite.com/docs/images/logo.svg"
						className="h-8 mr-3"
						alt="Flowbite Logo"
	/>*/}
					<span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-300">
						Slink
					</span>
				</a>
				<div className="flex items-center md:order-2">
					<button
						type="button"
						className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
						id="user-menu-button"
						aria-expanded="false"
						data-dropdown-toggle="user-dropdown"
						data-dropdown-placement="bottom"
					>
						<span className="sr-only">Open user menu</span>
						<img
							className="w-8 h-8 rounded-full"
							src="/docs/images/people/profile-picture-3.jpg"
							alt="user photo"
						/>
					</button>

					<div
						className="z-50 hidden my-4 text-base list-none text-gray-300 divide-y divide-gray-100 rounded-lg shadow"
						id="user-dropdown"
					>
						<div className="px-4 py-3">
							<span className="block text-sm text-gray-300 ">Bonnie Green</span>
							<span className="block text-sm  text-gray-500 truncate ">
								name@slink.xyz
							</span>
						</div>
						<ul className="py-2" aria-labelledby="user-menu-button">
							<li>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Dashboard
								</a>
							</li>
							<li>
								<a
									href="#"
									className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Sign out
								</a>
							</li>
						</ul>
					</div>
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
				<div
					className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
					id="navbar-user"
				>
					<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
						<li>
							<a
								href="#"
								className="block py-2 pl-3 pr-4 text-gray-300 bg-purple-700 rounded md:bg-transparent md:p-0"
								aria-current="page"
							>
								Home
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
							>
								About
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
							>
								Services
							</a>
						</li>
						<li>
							<a
								href="#"
								className="block py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-purple-700 md:p-0"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
