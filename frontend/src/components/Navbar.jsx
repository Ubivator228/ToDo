import React from "react";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/token";

export default function Navbar({ setAuthenticated }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        setAuthenticated(false);
        navigate("/login");
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">ToDo App</h1>
            <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
                Logout
            </button>
        </nav>
    );
}
