/* eslint-disable prettier/prettier */
export interface ProductDTO {
    name: string;
    thumbnail?: string;
    id: number;
    price: number;
    readonly categoryId?: number;
    readonly collectionId?: number;
    readonly stCategoryId?: number;
    readonly user?: any;

}
