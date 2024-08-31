import { useState, useEffect } from "react";
import axios from "axios";
import { FiUser, FiList, FiPackage } from "react-icons/fi";
import NavBar from "../NavBar";

function AdminDashboard() {
	const [activeTab, setActiveTab] = useState("users");
	const [users, setUsers] = useState([]);
	const [activities, setActivities] = useState([]);
	const [distributors, setDistributors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const token = localStorage.getItem("token");
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				};

				// Fetch users
				const userRes = await axios.get(
					"http://192.168.1.11:8004/admin/users",
					config
				);
				setUsers(userRes.data.data.users);

				// Uncomment if needed
				// const activityRes = await axios.get(
				// 	"https://auctionwebsitebackend.onrender.com/api/admin/activities",
				// 	config
				// );
				// setActivities(activityRes.data);

				// Fetch distributors
				const distributorRes = await axios.get(
					"https://ca72-2401-4900-8843-ffff-00-51-2a0b.ngrok-free.app/admin/distributors",
					config
				);
				setDistributors(distributorRes.data);
			} catch (err) {
				setError("Failed to load data");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleTabChange = (tab) => {
		setActiveTab(tab);
	};

	return (
		<>
			<NavBar />
			<div className="min-h-screen mt-[100px] bg-gray-100">
				<div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
					<div className="border-b border-gray-200">
						<div className="flex space-x-4 p-4">
							<button
								className={`tab-button flex items-center p-2 rounded-lg ${activeTab === "users" ? "bg-indigo-100 text-indigo-600" : "text-gray-600"}`}
								onClick={() => handleTabChange("users")}
							>
								<FiUser className="w-6 h-6" /> Users
							</button>
							<button
								className={`tab-button flex items-center p-2 rounded-lg ${activeTab === "activities" ? "bg-green-100 text-green-600" : "text-gray-600"}`}
								onClick={() => handleTabChange("activities")}
							>
								<FiList className="w-6 h-6" /> Activities
							</button>
							<button
								className={`tab-button flex items-center p-2 rounded-lg ${activeTab === "distributors" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
								onClick={() => handleTabChange("distributors")}
							>
								<FiPackage className="w-6 h-6" /> Distributors
							</button>
						</div>
					</div>

					<div className="p-6">
						{loading && <p className="text-center text-gray-600">Loading...</p>}
						{error && <p className="text-center text-red-500">{error}</p>}

						{activeTab === "users" && (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{users.map((user) => (
									<div key={user.id} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
										<div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-200 rounded-full">
											<span className="font-medium text-gray-600">{user.username.charAt(0).toUpperCase()}</span>
										</div>
										<div className="ml-4">
											<p className="text-lg font-semibold text-gray-800">{user.username}</p>
											<p className="text-gray-600">XP: {user.xp}</p>
										</div>
									</div>
								))}
							</div>
						)}

						{activeTab === "activities" && (
							<div className="space-y-4">
								{activities.map((activity) => (
									<div key={activity.id} className="p-4 bg-white rounded-lg shadow-md">
										<p className="font-semibold">{activity.title}</p>
										<p className="text-gray-500">{activity.description}</p>
									</div>
								))}
							</div>
						)}

						{activeTab === "distributors" && (
							<div className="space-y-4">
								{distributors.map((distributor) => (
									<div key={distributor.id} className="p-4 bg-white rounded-lg shadow-md">
										<p className="font-semibold">{distributor.name}</p>
										<p className="text-gray-500">Location: {distributor.location}</p>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminDashboard;
