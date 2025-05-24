import React from "react";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage({ onSwitchToLogin }) {
  return (
    <div>
      <h1>Регистрация</h1>
      <RegisterForm onRegister={onSwitchToLogin} />
      <button onClick={onSwitchToLogin}>Вернуться к входу</button>
    </div>
  );
}
