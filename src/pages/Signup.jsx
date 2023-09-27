import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../Constants/constants";
import { AuthContext } from "../AuthProvider";

function Signup() {
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState({});
	const [isDisabled, setIsDisabled] = useState(false);
	const { setUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const validateEmail = (email) => {
		const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

		if (!email) {
			return "Email is required.";
		} else if (!emailPattern.test(email)) {
			return "Invalid email format.";
		}
		return null;
	};

	const handleEmailChange = (e) => {
		const value = e.target.value;
		setEmail(value);

		const emailError = validateEmail(value);
		if (emailError) {
			setError((prevState) => ({ ...prevState, email: emailError }));
			setIsDisabled(true);
		} else {
			// eslint-disable-next-line no-unused-vars
			const { email, ...rest } = error;
			setError(rest);
			setIsDisabled(false);
		}
	};

	const validateUsername = (value) => {
		if (value.length <= 0) {
			const formError = { ...error, username: "Please enter a username" };
			setError(formError);
			setIsDisabled(true);
		} else if (value.length < 5) {
			const formError = { ...error, username: "Username is too short" };
			setError(formError);
			setIsDisabled(true);
		} else {
			// eslint-disable-next-line no-unused-vars
			const { username, ...rest } = error;
			setError(rest);
			setIsDisabled(false);
		}
	};

	const handleUsernameChange = (e) => {
		const value = e.target.value;
		setUsername(value);
		validateUsername(value);
	};

	const validatePassword = (value) => {
		if (value.length < 8) {
			const formError = { ...error, password: "Password is too short" };
			setError(formError);
			setIsDisabled(true);
		} else {
			// eslint-disable-next-line no-unused-vars
			const { password, ...rest } = error;
			setError(rest);
			setIsDisabled(false);
		}
	};

	const handlePasswordChange = (e) => {
		const value = e.target.value;
		setPassword(value);
		validatePassword(value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (Object.keys(error)?.length > 0) return;

		try {
			const response = await axios({
				method: "POST",
				url: `${API_URL}/register`,
				data: {
					email,
					username,
					password,
				},
			});
			toast.success(response?.data?.message);
			localStorage.setItem("token", response?.data?.token);
			setUser((prevState) => ({
				...prevState,
				isAuthenticated: true,
				username: response.data?.username,
				email: response.data?.email,
			}));
			navigate(`/${response?.data?.username}`);
			setUsername("");
			setEmail("");
			setPassword("");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-black">
			<div className="flex flex-col space-y-5">
				<span className="text-purple-600 text-2xl font-semibold italic text-center">
					Slink
				</span>
				<div className="md:w-[26.5rem] w-[24rem] p-8 bg-custom-gradient border border-[#AFAFAF] rounded-2xl shadow-2xl backdrop-blur-sm">
					<div className="text-center mb-8">
						<span className="text-lg font-semibold text-white">Sign in</span>
					</div>
					<form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
						<div className="flex flex-col">
							<label
								htmlFor="email"
								className="mb-2 text-sm text-[#EAECF0] font-semibold"
							>
								Email
							</label>
							<input
								type="email"
								name="email"
								value={email}
								onChange={handleEmailChange}
								placeholder="your@email.com"
								className="py-3 bg-transparent px-3 border border-[#FCFCFD] text-[#EAECF0] rounded-lg"
							/>
							{error?.email && (
								<span className="mt-2 text-red-500">{error?.email}</span>
							)}
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="username"
								className="mb-2 text-sm text-[#EAECF0] font-semibold"
							>
								Username
							</label>
							<input
								type="text"
								name="username"
								value={username}
								onChange={handleUsernameChange}
								placeholder="slinker"
								className="py-3 bg-transparent px-3 border border-[#FCFCFD] text-[#EAECF0] rounded-lg"
							/>
							{error?.username && (
								<span className="mt-2 text-red-500">{error?.username}</span>
							)}
						</div>
						<div className="flex flex-col">
							<label
								htmlFor="password"
								className="mb-2 text-sm text-[#EAECF0] font-semibold"
							>
								Password
							</label>
							<input
								type="password"
								name="password"
								placeholder="*********"
								value={password}
								onChange={handlePasswordChange}
								className="py-3 bg-transparent px-3 border border-[#FCFCFD] text-[#EAECF0] rounded-lg"
							/>
							{error?.password && (
								<span className="mt-2 text-red-500">{error?.password}</span>
							)}
						</div>
						<div className="flex flex-col">
							<button
								type="submit"
								disabled={isDisabled}
								className="text-white mt-6 mb-4 w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-2xl text-sm px-6 py-2"
							>
								Submit
							</button>
							<span className="text-[#AFAFAF] text-center">
								Already have an account?{" "}
								<Link to="/login">
									<span className="text-purple-500 font-semibold">Login</span>
								</Link>
							</span>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
