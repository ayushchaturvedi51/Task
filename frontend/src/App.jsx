import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import UserDashboard from "./components/Dashboard/UserDashboard";
import AdminDashboard from "./components/Dashboard/AminDashboard"; 
import DistributorDashboard from "./components/Dashboard/DistributorDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard/user" element={<UserDashboard />} />
                <Route path="/dashboard/admin" element={<AdminDashboard />} />
                <Route path="/dashboard/distributor" element={<DistributorDashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
