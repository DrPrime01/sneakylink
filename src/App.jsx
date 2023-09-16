import { Routes, Route } from "react-router-dom";

import SharedLayout from "./SharedLayout";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
	return (
		<div className="min-h-screen bg-black">
			<Routes>
				<Route path="signup" element={<Signup />} />
				<Route path="login" element={<Login />} />
				<Route path="/" element={<SharedLayout />}>
					<Route path="" element={<LandingPage />} />
					{/* Protected Routes here */}
					<Route path="/:username" element={<Homepage />} />
					<Route path="/:username/dashboard" element={<Dashboard />} />
					<Route path=":/username/settings" element={<Settings />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
