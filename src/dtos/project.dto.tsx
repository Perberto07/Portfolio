export type TechStackDto = {
    id: number;
    name: string;
    description: string;
}

export type CreateProjectDto = {
    title: string;
    description: string;
    videoLink: string;
    techStacks: TechStackDto[];
}

export interface GetTechStackDto {
    id: number;
    name: string;
    description: string;
}
export interface GetProjectDto {
    id: number;
    title: string;
    description: string;
    videoLink: string;
    techStacks: GetTechStackDto[];
}