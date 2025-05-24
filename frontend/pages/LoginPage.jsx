import { useState } from "react";
import { login } from "../api/user";

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const { token } = await login(username, password);
            localStorage.setItem("token", token);
            onLogin(token);
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
            <button type="submit">Login</button>
        </form>
    );
}
