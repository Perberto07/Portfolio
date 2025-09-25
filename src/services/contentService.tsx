import axios from "axios"
import type { CreateContentDto, GetContentDto } from "../dtos/content.dto"

const API_URL = "https://localhost:7295/api/content";

export const createContent = async (content: CreateContentDto) => {
    const response = await axios.post(`${API_URL}/create-content`, content);
    return response.data;
};

export const getContents = async (): Promise<GetContentDto[]> => {
    const response = await axios.get(`${API_URL}/get-content`)
    return response.data;
}