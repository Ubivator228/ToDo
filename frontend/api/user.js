import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_USER_API
});

export const login = ({ username, password }) =>
    api.post("/auth/login", { username, password });


export const register = (data) =>
    api.post("/auth/register", data); // ← ✅ маршрут соответствует Go-коду

export const getMe = (token) =>
    api.get("/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
