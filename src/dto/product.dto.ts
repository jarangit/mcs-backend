/* eslint-disable prettier/prettier */
export interface ProductDTO {
    name: string;
    id: number;
    price: number;
    readonly categoryId?: number;
    readonly collectionId?: number;
    readonly user?: any;

}
