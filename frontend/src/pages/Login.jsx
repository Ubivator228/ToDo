import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/login', {
                email,
                password,
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            onLogin(token);
        } catch (err) {
            setError('Неверный email или пароль');
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>
            {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    className="w-full px-4 py-2 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
