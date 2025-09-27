import axios from "axios";
import type { NewsArticle } from "../dtos/news.dto"

const API_URL = "https://localhost:7295/api/News";

export const getNews = async (): Promise<NewsArticle[]> => {
    const response = await axios.get<NewsArticle[]>(API_URL);
    return response.data;
};