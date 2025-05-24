import React, { useState } from 'react';
import { login, getMe as getCurrentUser } from '../api/user';


const LoginForm = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { token } = await login({ username, password }); // ✅ передаём объект

            localStorage.setItem('token', token);
            const user = await getCurrentUser(token); // 👈 передаём токен явно
            onLogin(user);
        } catch (err) {
            alert('Ошибка входа');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
