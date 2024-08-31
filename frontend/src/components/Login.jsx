import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiMail, FiLock } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [role, setRole] = useState(""); // New state for role
	const navigate = useNavigate();
	const { isLoggedIn, login } = useAuth();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/profile");
		}
	}, [isLoggedIn, navigate]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post(
				"https://auctionwebsitebackend.onrender.com/api/users/login",
				{ email, password },
				{ withCredentials: true }
			);
			if (res.status === 200) {
				login();
				if (role === "admin") {
					navigate("/admin-dashboard");
				} else if (role === "distributor") {
					navigate("/distributor-dashboard");
				} else {
					navigate("/user-dashboard");
				}
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
			style={{
				backgroundImage:
					"url('https://source.unsplash.com/1600x900/?technology,login')",
			}}
		>
			<div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
				<h2 className="mb-6 text-3xl font-semibold text-white text-center">
					Login
				</h2>
				<form onSubmit={handleLogin} className="space-y-4">
					<div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
						<FiMail className="w-6 h-6 text-gray-400 ml-3" />
						<input
							type="email"
							className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="flex items-center border rounded-md border-gray-600 bg-gray-700">
						<FiLock className="w-6 h-6 text-gray-400 ml-3" />
						<input
							type="password"
							className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="mt-4 text-white flex justify-between items-center">
					<div className="flex items-center">
						<input
							type="radio"
							id="user"
							name="role"
							value="user"
							checked={role === "user"}
							onChange={(e) => setRole(e.target.value)}
							className="mr-2"
						/>
						<label htmlFor="user">User</label>
					</div>
					<div className="flex items-center mt-2">
						<input
							type="radio"
							id="admin"
							name="role"
							value="admin"
							checked={role === "admin"}
							onChange={(e) => setRole(e.target.value)}
							className="mr-2"
						/>
						<label htmlFor="admin">Admin</label>
					</div>
					<div className="flex items-center mt-2">
						<input
							type="radio"
							id="distributor"
							name="role"
							value="distributor"
							checked={role === "distributor"}
							onChange={(e) => setRole(e.target.value)}
							className="mr-2"
						/>
						<label htmlFor="distributor">Distributor</label>
					</div>
				</div>
					<div className="flex items-center justify-between mt-4">
						<p className="text-white">
							Don{"'"}t have an account?{" "}
							<Link
								to="/signup"
								className="text-indigo-300 hover:underline"
							>
								Signup
							</Link>
						</p>
						<button
							type="submit"
							className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							disabled={loading}
						>
							{loading ? (
								<AiOutlineLoading3Quarters className="w-6 h-6 animate-spin mx-auto" />
							) : (
								"Login"
							)}
						</button>
					</div>
				</form>
			
				{error && (
					<div className="mt-4 text-red-300 text-center">{error}</div>
				)}
			</div>
		</div>
	);
}

export default Login;
