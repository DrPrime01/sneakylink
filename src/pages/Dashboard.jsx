import { useState, useEffect } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../AuthProvider";
import { API_URL } from "../Constants/constants";

function Dashboard() {
	const { user } = useContext(AuthContext);
	const [allUrls, setAllUrls] = useState([]);
	const token = localStorage.getItem("token");

	useEffect(() => {
		const getAllUrls = async () => {
			try {
				const response = await axios({
					method: "GET",
					url: `${API_URL}/${user?.username}/dashboard`,
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				setAllUrls(response?.data?.shortened_urls);
			} catch (err) {
				console.log(err);
			}
		};
		getAllUrls();
	}, [token, user]);

	if (!user?.isAuthenticated) {
		return <Navigate to="/" replace={true} />;
	}
	return (
		<section className="min-h-screen mb-6 md:px-12 xl:px-5 px-5 max-w-screen-xl mx-auto flex justify-center relative">
			<div className="w-[302px] h-[302px] flex-shrink-0 rounded-full bg-gradient-to-b from-[#530061] to-[#0D0A30] absolute right-20"></div>
			<div className="w-[220px] h-[220px] flex-shrink-0 rounded-full bg-gradient-to-b from-[#530061] to-[#0D0A30] absolute left-20 bottom-20"></div>
			<div className="mt-36 md:h-[20rem] md:w-[50rem] text-center py-20 bg-custom-gradient border border-[#AFAFAF] p-10 rounded-2xl shadow-2xl backdrop-blur-sm">
				<span className="font-semibold text-xl text-purple-500 mb-5 block">
					All Urls
				</span>
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50">
							<tr>
								<th scope="col" className="px-6 py-3">
									Shortened Link
								</th>
								<th scope="col" className="px-6 py-3">
									Custom id
								</th>
								<th scope="col" className="px-6 py-3">
									Link
								</th>
								<th scope="col" className="px-6 py-3">
									Date Created
								</th>
							</tr>
						</thead>
						<tbody>
							{allUrls?.map((urls) => {
								return (
									<tr className="bg-white border-b" key={urls?.id}>
										<th
											scope="row"
											className="px-6 py-4 font-medium whitespace-nowrap"
										>
											<a
												className="hover:text-purple-600"
												href={urls?.short_url}
												target="_blank"
												rel="noopener noreferrer"
											>
												{urls?.short_url}
											</a>
										</th>
										<td className="px-6 py-4">{urls?.short_id}</td>
										<td className="px-6 py-4 truncate">{urls?.original_url}</td>
										<td className="px-6 py-4">
											{moment(urls?.created_at).fromNow()}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
}

export default Dashboard;
