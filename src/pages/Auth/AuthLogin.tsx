import { useAuth } from "../../components/Auth/AuthContext";
import type { FieldConfig } from "../../components/Form/ReusableForm";
import ReusableForm from "../../components/Form/ReusableForm";
import { loginUser } from "../../services/authService";

type LoginDto = {
    name: string;
    password: string;
}

const AuthLogin: React.FC = () => {
    const { login } = useAuth();

    const parentFields: FieldConfig[] = [
        { name: "name", label: "Name", type: "text", placeholder: "Enter Your Name", required: true },
        { name: "password", label: "Password", type: "password", placeholder: "Enter Your Password", required: true },
    ]

    const handleLogin = async (data: LoginDto) => {
        try {
            const response = await loginUser(data);
            if (response.success && response.token) {
                login(response.token);
            } else {
                alert("Invalid")
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ReusableForm<LoginDto>
            title="Login" parentFields={parentFields} onSubmit={handleLogin}
        />
    );
};

export default AuthLogin;
       
