import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import TodoPage from "../pages/TodoPage";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [showRegister, setShowRegister] = useState(false);

    const handleLogin = (token) => {
        setToken(token);
        localStorage.setItem("token", token);
    };

    if (!token) {
        return (
            <>
                {showRegister ? (
                    <>
                        <RegisterForm onRegister={() => setShowRegister(false)} />
                        <button onClick={() => setShowRegister(false)}>Уже есть аккаунт? Войти</button>
                    </>
                ) : (
                    <>
                        <LoginForm onLogin={handleLogin} />
                        <button onClick={() => setShowRegister(true)}>Регистрация</button>
                    </>
                )}
            </>
        );
    }

    return <TodoPage token={token} />;
}
