import React, { useState } from "react";
import type { LoginDto, RegisterDto } from "../dtos/auth.dto";
import { loginUser, registerUser } from "../services/authService";
import { useAuth } from "../components/Auth/AuthContext";

const AuthForm: React.FC = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const { login } = useAuth();

    const handleRegister = async () => {
        const data: RegisterDto = { name, password, confirmPassword };
        const result = await registerUser(data);
        setMessage(result.message);
    };

    const handlelogin = async () => {
        const data: LoginDto = { name, password };
        const result = await loginUser(data);
        setMessage(result.message);
        console.log("token", result.token);
        if (result.success && result.token) {
            login(result.token);
        }
    };

    return (
        <div>
            <h2>Auth Form</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <button onClick={handlelogin}>Login</button>
            {message && <p className="text-black">{message}</p>}
        </div>
    );
};

export default AuthForm;
