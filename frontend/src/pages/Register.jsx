import React, { useState } from 'react';
import { register } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            navigate('/login');
        } catch (err) {
            setError('Ошибка регистрации');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-80 space-y-4"
            >
                <h2 className="text-xl font-bold">Регистрация</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    className="w-full px-3 py-2 border rounded"
                    onChange={handleChange}
                    required
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    );
};

export default Register;
