import React, { useEffect, useState } from 'react';
import {getTodos} from "../api/todo.js";


const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    const loadTodos = async () => {
        const data = await getTodos();
        setTodos(data);
    };

    useEffect(() => {
        loadTodos();
    }, []);

    const handleAdd = async () => {
        if (!title.trim()) return;
        await addTodo(title);
        setTitle('');
        loadTodos();
    };

    const handleToggle = async (id) => {
        await toggleTodo(id);
        loadTodos();
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        loadTodos();
    };

    return (
        <div>
            <h2>Todo List</h2>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New todo" />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.ID}>
                        <input type="checkbox" checked={todo.Completed} onChange={() => handleToggle(todo.ID)} />
                        {todo.Title}
                        <button onClick={() => handleDelete(todo.ID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
