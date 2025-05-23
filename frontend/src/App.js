import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TodoList from "./pages/TodoList";
import { getToken } from "./utils/token";

export default function App() {
    const [authenticated, setAuthenticated] = useState(!!getToken());

    useEffect(() => {
        setAuthenticated(!!getToken());
    }, []);

    return (
        <Router>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/todos"
                    element={
                        authenticated ? <TodoList /> : <Navigate replace to="/login" />
                    }
                />
                <Route path="*" element={<Navigate to="/todos" />} />
            </Routes>
        </Router>
    );
}
