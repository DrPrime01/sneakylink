import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import axios from "axios";
import { API_URL } from "../Constants/constants";

function Homepage() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [customId, setCustomId] = useState("");
	const { user } = useContext(AuthContext);
	const token = localStorage.getItem("token");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios({
				method: "POST",
				url: `${API_URL}/${user?.username}`,
				data: {
					url,
					custom_id: customId,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
			setShortUrl(response?.data?.short_url);
			setUrl("");
			setCustomId("");
		} catch (err) {
			console.log(err);
		}
	};
	if (!user?.isAuthenticated) {
		return <Navigate to="/" replace={true} />;
	}
	return (
		<section className="min-h-screen mb-6 md:px-12 xl:px-5 px-5 max-w-screen-xl mx-auto flex justify-center relative">
			<div className="w-[302px] h-[302px] flex-shrink-0 rounded-full bg-gradient-to-b from-[#530061] to-[#0D0A30] absolute right-20"></div>
			<div className="w-[220px] h-[220px] flex-shrink-0 rounded-full bg-gradient-to-b from-[#530061] to-[#0D0A30] absolute left-20 bottom-20"></div>
			<div className="mt-36 h-[20rem] w-[50rem] text-center py-20 bg-custom-gradient border border-[#AFAFAF] p-10 rounded-2xl shadow-2xl backdrop-blur-sm">
				<form onSubmit={handleSubmit} className="w-full">
					<label
						htmlFor="url"
						className="mb-2 text-sm font-medium text-gray-900 sr-only"
					>
						Url
					</label>
					<div className="relative">
						<input
							type="text"
							id="search"
							className="block w-full bg-transparent border-t-0 border-x-0 shadow-xl p-4 pl-10 text-sm text-gray-300 truncate border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Enter url here..."
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							required
						/>
						<input
							type="text"
							id="search"
							className="block w-full bg-transparent border-t-0 border-x-0 shadow-xl p-4 pl-10 text-sm text-gray-300 truncate border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Enter custom code here..."
							value={customId}
							onChange={(e) => setCustomId(e.target.value)}
							required
						/>
						<button
							type="submit"
							className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-2"
						>
							Submit
						</button>
					</div>
				</form>
				<div className="mt-10 border rounded-lg h-12 text-gray-300 text-left flex items-center pl-4">
					<a href={shortUrl} target="_blank" rel="noreferrer">
						{shortUrl}
					</a>
				</div>
			</div>
		</section>
	);
}

export default Homepage;
