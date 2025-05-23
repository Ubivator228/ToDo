import axios from "axios";
import { getToken } from "../utils/token";

const createApiClient = (baseURL) => {
    const instance = axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json"
        }
    });

    instance.interceptors.request.use(config => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};

const handleError = (error, context) => {
    const response = error.response || {};
    console.error(`${context}:`, {
        message: error.message,
        status: response.status,
        data: response.data,
        config: error.config
    });
    throw error;
};

// User Service API
const userApi = createApiClient(import.meta.env.VITE_API_URL || "http://localhost:8081");

export const authAPI = {
    register: async (userData) => {
        try {
            const response = await userApi.post("/auth/register", userData);
            return response.data;
        } catch (error) {
            handleError(error, "Registration error");
        }
    },

    login: async ({ username, password }) => {
        try {
            const response = await userApi.post("/auth/login", { username, password });
            return response.data;
        } catch (error) {
            handleError(error, "Login error");
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await userApi.get("/me");
            return response.data;
        } catch (error) {
            handleError(error, "Get user error");
        }
    }
};

// Todo Service API
const todoApi = createApiClient(import.meta.env.VITE_TODO_API || "http://localhost:8082");

export const todoAPI = {
    getAll: async () => {
        try {
            const response = await todoApi.get("/todos");
            return response.data;
        } catch (error) {
            handleError(error, "Get todos error");
        }
    },

    create: async (title) => {
        try {
            const response = await todoApi.post("/todos", { title });
            return response.data;
        } catch (error) {
            handleError(error, "Add todo error");
        }
    },

    delete: async (id) => {
        try {
            const response = await todoApi.delete(`/todos/${id}`);
            return response.data;
        } catch (error) {
            handleError(error, "Delete todo error");
        }
    },

    toggle: async (id) => {
        try {
            const response = await todoApi.put(`/todos/${id}/toggle`);
            return response.data;
        } catch (error) {
            handleError(error, "Toggle todo error");
        }
    }
};

// Явные экспорты для удобства
export const register = authAPI.register;
export const login = authAPI.login;
export const getCurrentUser = authAPI.getCurrentUser;
export const getTodos = todoAPI.getAll;
export const addTodo = todoAPI.create;
export const deleteTodo = todoAPI.delete;
export const toggleTodo = todoAPI.toggle;