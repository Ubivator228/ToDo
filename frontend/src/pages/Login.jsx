import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({
        username: '',  // Изменено с email на username для соответствия API
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Используем функцию login из api.js
            const response = await login({
                username: credentials.username,
                password: credentials.password
            });

            const token = response.token;  // Получаем токен из ответа
            localStorage.setItem('token', token);
            if (onLogin) onLogin(token);
            navigate('/todos');  // Перенаправляем на страницу задач
        } catch (err) {
            setError('Неверное имя пользователя или пароль');
            console.error('Login error:', err);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>
            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default Login;