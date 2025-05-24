import React, { useState } from "react";
import { register } from "../api/user";

export default function RegisterForm({ onRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ username, password });
            alert("Регистрация успешна! Теперь войдите в аккаунт.");
            onRegister(); // просто переключаем на логин
        } catch (err) {
            alert("Ошибка регистрации");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                required
            />
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}
