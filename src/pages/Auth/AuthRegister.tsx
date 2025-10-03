//import React, { useState } from "react";
//import type { LoginDto, RegisterDto } from "../dtos/auth.dto";
//import { loginUser, registerUser } from "../services/authService";
import type { Register } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";
import type { FieldConfig } from "../../components/Form/ReusableForm";
import ReusableForm from "../../components/Form/ReusableForm";
import { loginUser, registerUser } from "../../services/authService";

type RegisterDto = {
    name: string;
    password: string;
}

const AuthRegister: React.FC = () => {
    //const [name, setName] = useState("");
    //const [password, setPassword] = useState("");
    //const [confirmPassword, setConfirmPassword] = useState("");
    //const [message, setMessage] = useState("");
    const { login } = useAuth();

    const parentFields: FieldConfig[] = [
        { name: "name", label: "Name", type: "text", placeholder: "Enter Your Name", required: true },
        { name: "password", label: "Password", type: "password", placeholder: "Enter Your Password", required: true },
    ]
    //const handleRegister = async () => {
    //    const data: RegisterDto = { name, password, confirmPassword };
    //    const result = await registerUser(data);
    //    setMessage(result.message);
    //};

    //const handlelogin = async () => {
    //    const data: LoginDto = { name, password };
    //    const result = await loginUser(data);
    //    setMessage(result.message);
    //    console.log("token", result.token);
    //    if (result.success && result.token) {
    //        login(result.token);
    //    }
    //};

    const handleRegister = async (data: RegisterDto) => {
        try {
            const response = await registerUser(data);
            if (response.success) {
                alert("Register Success");
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <ReusableForm<RegisterDto>
            title="Login" parentFields={parentFields} onSubmit={handleRegister} />
    );
};

export default AuthRegister;

