import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState, useEffect } from "react";
import { AuthProvider } from "./contexts/index";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AminDashboard";
import DistributorDashboard from "./components/Dashboard/DistributorDashboard";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};

	const token = document.cookie
		.split("; ")
		.find((row) => row.startsWith("jwt="))
		?.split("=")[1];

	useEffect(() => {
		if (token) {
			login();
		} else {
			logout();
		}
	}, [token]);

	return (
		<AuthProvider value={{ isLoggedIn, login, logout }}>
			<Router>
				<NavBar />
				<div className="container bg-[#1b1b25] pt-16">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/profile"
							element={<ProtectedRoute component={Profile} />}
						/>
				<Route
							path="/dashboard/user"
							element={<ProtectedRoute component={UserDashboard} />}
						/>
						<Route
							path="/dashboard/admin"
							element={<ProtectedRoute component={AdminDashboard} />}
						/>
						<Route
							path="/dashboard/distributor"
							element={<ProtectedRoute component={DistributorDashboard} />}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
