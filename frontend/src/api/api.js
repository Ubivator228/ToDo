import axios from "axios";
import { getToken } from "../utils/token";

const headers = () => ({
    Authorization: `Bearer ${getToken()}`,
});

// --- AUTH ---
export const register = async (username, password) => {
    const res = await axios.post("/api/auth/register", { username, password });
    return res.data;
};

export const login = async (username, password) => {
    const res = await axios.post("/api/auth/login", { username, password });
    return res.data;
};

// --- TODOS ---
export const getTodos = async () => {
    const res = await axios.get("/api/todos/todos", { headers: headers() });
    return res.data;
};

export const addTodo = async (title) => {
    const res = await axios.post("/api/todos/todos", { title }, { headers: headers() });
    return res.data;
};

export const deleteTodo = async (id) => {
    const res = await axios.delete(`/api/todos/todos/${id}`, { headers: headers() });
    return res.data;
};

export const toggleTodo = async (id) => {
    const res = await axios.put(`/api/todos/todos/${id}/toggle`, {}, { headers: headers() });
    return res.data;
};
