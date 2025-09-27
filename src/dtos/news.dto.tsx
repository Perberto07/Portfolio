// Data Transfer Object for News

export interface NewsArticle{
    title: string;
    link: string;
    description: string;
    imageUrl: string;
    creator: string;
    pubDate: string;
    sourceName: string;
    country: string[];
    category: string[];
}