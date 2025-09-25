export interface TechStackDto {
    name: string;
    description: string;
}

export interface CreateProjectDto {
    title: string;
    description: string;
    techStacks: TechStackDto[];
}

export interface GetTechStackDto {
    id: Int16Array;
    name: string;
    description: string;
}
export interface GetProjectDto {
    title: string;
    description: string;
    techStacks: GetTechStackDto[];
}