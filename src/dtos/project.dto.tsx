export type TechStackDto = {
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
    id: Int16Array;
    name: string;
    description: string;
}
export interface GetProjectDto {
    title: string;
    description: string;
    videoLink: string;
    techStacks: GetTechStackDto[];
}