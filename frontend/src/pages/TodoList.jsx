import React, { useEffect, useState } from 'react';
import { todoAPI } from '../api/api';
import { getToken } from '../utils/token';
import { useNavigate } from 'react-router-dom';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await todoAPI.getAll();
                setTodos(data);
            } catch (err) {
                navigate('/login');
            }
        };

        if (!getToken()) {
            navigate('/login');
        } else {
            fetchTodos();
        }
    }, [navigate]);

    const handleAdd = async () => {
        if (!newTitle.trim()) return;
        const added = await todoAPI.create(newTitle);
        setTodos([...todos, added]);
        setNewTitle('');
    };

    const handleToggle = async (id) => {
        await todoAPI.toggle(id);
        setTodos(todos.map(todo => (
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )));
    };

    const handleDelete = async (id) => {
        await todoAPI.delete(id);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Список задач</h1>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Новая задача"
                    className="flex-grow px-3 py-2 border rounded-l"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
                >
                    Добавить
                </button>
            </div>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className="flex justify-between items-center bg-white p-3 rounded shadow"
                    >
                        <span
                            className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                            onClick={() => handleToggle(todo.id)}
                        >
                            {todo.title}
                        </span>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            className="ml-4 text-red-500 hover:text-red-700"
                        >
                            Удалить
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;