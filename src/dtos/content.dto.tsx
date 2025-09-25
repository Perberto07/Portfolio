export interface ItemDto {
    header: string;
    textContent: string;
}

export interface CreateContentDto {
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
