import axios from "axios";
const api = axios.create({ baseURL: import.meta.env.VITE_TODO_API });

export const getTodos = (token) =>
    api.get("/todos", { headers: { Authorization: `Bearer ${token}` } });

export const createTodo = (title, token) =>
    api.post("/todos", { title }, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTodo = (id, token) =>
    api.delete(`/todos/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const toggleTodo = (id, token) =>
    api.put(`/todos/${id}/toggle`, {}, { headers: { Authorization: `Bearer ${token}` } });
