export type  ItemDto = {
    header: string;
    textContent: string;
}

export type CreateContentDto = {
    name: string
    items: ItemDto[];
}
export interface GetItemDto {
    header: string;
    textContent: string;
}

export interface GetContentDto {
    name: string;
    items: GetItemDto[];
}
