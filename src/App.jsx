import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import SharedLayout from "./SharedLayout";
import AuthProvider from "./AuthProvider";
import Homepage from "./pages/Homepage";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
	return (
		<AuthProvider>
			<div className="min-h-screen bg-black">
				<ToastContainer />
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
		</AuthProvider>
	);
}

export default App;
