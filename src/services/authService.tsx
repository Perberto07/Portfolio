import axios from "axios"; // Removed AxiosError
import type { AuthResponseDto, LoginDto, RegisterDto } from "../dtos/auth.dto";

const API_URL = "https://fullporfolio.onrender.com/api/Auth";
//const API_URL = "https://localhost:7295/api/Auth";

export const registerUser = async (data: RegisterDto): Promise<AuthResponseDto> => {
    try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
    } catch (error: unknown) {
        let message = "Registration failed";

        if (axios.isAxiosError(error) && error.response) {
            message = (error.response.data as { message?: string }).message || message;
        }

        return {
            success: false,
            message,
        };
    }
};

export const loginUser = async (data: LoginDto): Promise<AuthResponseDto> => {
    try {
        const response = await axios.post<AuthResponseDto>(`${API_URL}/login`, data);
        return response.data;
    } catch (error: unknown) {
        let message = "Login Field";
        if (axios.isAxiosError(error) && error.response) {
            message = (error.response.data as { message?: string }).message || message;
        }
        return { success: false, message };
    }
}