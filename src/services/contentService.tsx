import axios from "axios"
import type { CreateContentDto, GetContentDto } from "../dtos/content.dto"

const API_URL = "https://localhost:7295/api/content";
//const API_URL = "https://a3467ca03cff.ngrok-free.app/api/content";


const api = axios.create({
    baseURL: API_URL,
    headers: {
        "ngrok-skip-browser-warning": "true",
    },
});


export const createContent = async (content: CreateContentDto) => {
    const response = await api.post(`${API_URL}/create-content`, content);
    return response.data;
};

export const getContents = async (): Promise<GetContentDto[]> => {
    const response = await api.get(`${API_URL}/get-content`)
    return response.data;
}