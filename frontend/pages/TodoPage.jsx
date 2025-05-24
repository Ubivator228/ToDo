import { useEffect, useState } from "react";
import { getTodos, createTodo, deleteTodo, toggleTodo } from "../api/todo";

export default function TodoPage({ token }) {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");

    const fetchTodos = async () => {
        const data = await getTodos(token);
        setTodos(data);
    };

    const handleAdd = async () => {
        if (!title) return;
        await createTodo(title, token);
        setTitle("");
        fetchTodos();
    };

    const handleToggle = async (id) => {
        await toggleTodo(id, token);
        fetchTodos();
    };

    const handleDelete = async (id) => {
        await deleteTodo(id, token);
        fetchTodos();
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h2>Todo List</h2>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New todo" />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.ID}>
            <span
                style={{ textDecoration: todo.Completed ? "line-through" : "none", cursor: "pointer" }}
                onClick={() => handleToggle(todo.ID)}
            >
              {todo.Title}
            </span>
                        <button onClick={() => handleDelete(todo.ID)}>X</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
