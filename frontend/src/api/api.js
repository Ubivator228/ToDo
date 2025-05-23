import axios from "axios";
import { getToken } from "../utils/token";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081";

// Функция для формирования заголовков
const headers = () => {
    const token = getToken();
    return {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json"
    };
};

// Auth API
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};

export const login = async ({ username, password }) => {  // Деструктуризация параметров
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { username, password });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

// Todos API
export const getTodos = async () => {
    try {
        const response = await axios.get(`${API_URL}/api/todos`, { headers: headers() });
        return response.data;
    } catch (error) {
        console.error("Get todos error:", error);
        throw error;
    }
};

export const addTodo = async (title) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/todos`,
            { title },
            { headers: headers() }
        );
        return response.data;
    } catch (error) {
        console.error("Add todo error:", error);
        throw error;
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(
            `${API_URL}/api/todos/${id}`,
            { headers: headers() }
        );
        return response.data;
    } catch (error) {
        console.error("Delete todo error:", error);
        throw error;
    }
};

export const toggleTodo = async (id) => {
    try {
        const response = await axios.put(
            `${API_URL}/api/todos/${id}/toggle`,
            {},
            { headers: headers() }
        );
        return response.data;
    } catch (error) {
        console.error("Toggle todo error:", error);
        throw error;
    }
};