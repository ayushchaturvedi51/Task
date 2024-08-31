import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("user");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const res = await axios.post("https://ca72-2401-4900-8843-ffff-00-51-2a0b.ngrok-free.app/auth/login", {
				email,
				password,
				role,
			});

			if (res.status === 200) {
				const roleToPath = {
					user: "/dashboard/user",
					admin: "/dashboard/admin",
					distributor: "/dashboard/distributor",
				};

				navigate(roleToPath[role] || "/");
			}
		} catch (err) {
			setError(err.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-700 bg-cover bg-center"
			style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,login')" }}>
			<div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-80 rounded-lg shadow-lg">
				<h2 className="mb-6 text-3xl font-semibold text-white text-center">Login</h2>
				{error && <p className="text-red-500">{error}</p>}
				<form onSubmit={handleLogin} className="space-y-4">
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full px-4 py-2 bg-gray-700 text-white placeholder-gray-400 border rounded-md border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
					/>
					<div className="flex justify-between text-white">
						{["user", "admin", "distributor"].map((roleOption) => (
							<label key={roleOption}>
								<input
									type="radio"
									name="role"
									value={roleOption}
									checked={role === roleOption}
									onChange={() => setRole(roleOption)}
									className="mr-1"
								/>
								{roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
							</label>
						))}
					</div>
					<div className="flex items-center justify-between mt-4">
						<p className="text-white">
							Don{"'"}t have an account?{" "}
							<Link to="/signup" className="text-indigo-300 hover:underline">
								Signup
							</Link>
						</p>
						<button
							type="submit"
							className="px-6 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
							disabled={loading}
						>
							{loading ? "Loading..." : "Login"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
