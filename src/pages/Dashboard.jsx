import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

function Dashboard() {
	const { user } = useContext(AuthContext);
	if (!user?.isAuthenticated) {
		return <Navigate to="/" replace={true} />;
	}
	return <div></div>;
}

export default Dashboard;
