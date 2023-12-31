import { useState } from "react";
import axios from "axios";
import { HiClipboardList } from "react-icons/hi";
import { API_URL } from "../Constants/constants";
import { toast } from "react-toastify";

function LandingPage() {
	const [url, setUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [urlError, setUrlError] = useState(false);

	const isValidURL = (str) => {
		const pattern = new RegExp(
			"^(https?:\\/\\/)?" +
				"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
				"((\\d{1,3}\\.){3}\\d{1,3}))" +
				"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
				"(\\?[;&a-z\\d%_.~+=-]*)?" +
				"(\\#[-a-z\\d_]*)?$",
			"i"
		);
		return !!pattern.test(str);
	};

	const handleUrl = (e) => {
		const value = e.target.value;
		setUrl(value);
		setUrlError(!isValidURL(value));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios({
				method: "POST",
				url: API_URL,
				data: {
					url,
				},
			});
			console.log(response);
			setShortUrl(response?.data?.short_url);
			setUrl("");
		} catch (err) {
			console.log(err);
		}
	};
	const copyToClipboard = () => {
		if (!shortUrl) return;
		try {
			navigator.clipboard.writeText(shortUrl);
			toast("URL copied to clipboard");
		} catch (err) {
			console.error("Failed to copy URL: ", err);
		}
	};
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
						<div>
							<input
								type="text"
								id="search"
								className="block w-full bg-transparent border-t-0 border-x-0 shadow-xl py-4 md:w-5/6 text-sm text-gray-300 truncate border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Enter url here..."
								value={url}
								onChange={handleUrl}
								required
							/>
							{urlError && (
								<span className="block mt-3 text-red-500 text-left">
									Enter a valid URL!!!
								</span>
							)}
						</div>
						<button
							type="submit"
							disabled={urlError || !url}
							className="text-white absolute right-2.5 top-2 disabled:opacity-50 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-2"
						>
							Submit
						</button>
					</div>
				</form>
				<div className="mt-10 border rounded-lg h-12 text-gray-300 text-left flex items-center justify-between px-4">
					<a href={shortUrl} target="_blank" rel="noreferrer">
						{shortUrl}
					</a>
					<div className="text-right">
						<HiClipboardList
							className="text-purple-500 cursor-pointer"
							onClick={copyToClipboard}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}

export default LandingPage;
