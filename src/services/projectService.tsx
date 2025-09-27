import axios from "axios"
import type { CreateProjectDto, GetProjectDto} from "../dtos/project.dto"

const API_URL = "https://localhost:7295/api/project";
//const API_URL = "https://a3467ca03cff.ngrok-free.app/api/project";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "ngrok-skip-browser-warning": "true",
    },
});


export const createProject = async (project: CreateProjectDto) => {
    const response = await api.post(`${API_URL}/create-project`, project);
    return response.data;
};

export const getProjects = async (): Promise<GetProjectDto[]> => {
    const response = await api.get(`${API_URL}/Get-Project`);
    return response.data;
};