import { useState, useEffect } from "react";
import axios from "axios";
import { FiUser, FiList, FiPackage } from "react-icons/fi";

function AdminDashboard() {
	const [activeTab, setActiveTab] = useState("users");
	const [users, setUsers] = useState([]);
	const [activities, setActivities] = useState([]);
	const [distributors, setDistributors] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchData = async () => {
      console.log("user dashboard call")
			setLoading(true);
			try {
				// Fetch users
				const userRes = await axios.get(
					"https://auctionwebsitebackend.onrender.com/api/admin/users"
				);
				setUsers(userRes.data);

				// Fetch activities
				const activityRes = await axios.get(
					"https://auctionwebsitebackend.onrender.com/api/admin/activities"
				);
				setActivities(activityRes.data);

				// Fetch distributors
				const distributorRes = await axios.get(
					"https://auctionwebsitebackend.onrender.com/api/admin/distributors"
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
		<div className="min-h-screen p-4 bg-gray-100">
			<div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
				<div className="border-b border-gray-200">
					<div className="flex">
						<button
							className={`tab-button ${activeTab === "users" ? "active" : ""}`}
							onClick={() => handleTabChange("users")}
						>
							<FiUser className="w-6 h-6 text-indigo-500" /> Users
						</button>
						<button
							className={`tab-button ${activeTab === "activities" ? "active" : ""}`}
							onClick={() => handleTabChange("activities")}
						>
							<FiList className="w-6 h-6 text-green-500" /> Activities
						</button>
						<button
							className={`tab-button ${activeTab === "distributors" ? "active" : ""}`}
							onClick={() => handleTabChange("distributors")}
						>
							<FiPackage className="w-6 h-6 text-blue-500" /> Distributors
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
								<div key={activity.orderId} className="p-4 bg-white rounded-lg shadow-sm">
									<p className="text-sm text-gray-600">Order ID: <span className="font-semibold">{activity.orderId}</span></p>
									<p className="text-sm text-gray-600">Amount: <span className="font-semibold">${activity.transactionAmount}</span></p>
									<p className="text-sm text-gray-600">User ID: <span className="font-semibold">{activity.userId}</span></p>
									<p className={`text-sm font-semibold ${activity.status === "success" ? "text-green-500" : "text-orange-500"}`}>
										Status: {activity.status}
									</p>
								</div>
							))}
						</div>
					)}

					{activeTab === "distributors" && (
						<div className="space-y-4">
							{distributors.map((distributor) => (
								<div key={distributor.organizationName} className="p-4 bg-white rounded-lg shadow-sm">
									<p className="text-lg font-semibold text-gray-800">{distributor.organizationName}</p>
									<p className="text-gray-600">Created At: {new Date(distributor.createdAt).toLocaleDateString()}</p>
									<p className="text-gray-600">Updated At: {new Date(distributor.updatedAt).toLocaleDateString()}</p>
								</div>
							))}
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				.tab-button {
					flex: 1;
					padding: 12px;
					text-align: center;
					background: #f9f9f9;
					border: none;
					cursor: pointer;
					transition: background 0.3s;
					font-size: 16px;
					color: #333;
				}
				.tab-button.active {
					background: #e0e0e0;
					color: #000;
				}
				.tab-icon {
					margin-right: 8px;
				}
			`}</style>
		</div>
	);
}

export default AdminDashboard;
