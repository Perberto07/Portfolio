import type { FieldConfig } from "../../components/Form/ReusableForm";
import ReusableForm from "../../components/Form/ReusableForm";
import { registerUser } from "../../services/authService";

type RegisterDto = {
    name: string;
    password: string;
}

const AuthRegister: React.FC = () => {

    const parentFields: FieldConfig[] = [
        { name: "name", label: "Name", type: "text", placeholder: "Enter Your Name", required: true },
        { name: "password", label: "Password", type: "password", placeholder: "Enter Your Password", required: true },
    ]

    const handleRegister = async (data: RegisterDto) => {
        try {
            const response = await registerUser(data);
            if (response.success) {
                alert("Register Success");
            }
        } catch (error) {
            console.log(error);z
        }
    };

    return (
        <ReusableForm<RegisterDto>
            title="Login" parentFields={parentFields} onSubmit={handleRegister} />
    );
};

export default AuthRegister;

