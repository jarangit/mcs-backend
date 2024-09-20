export interface ProductDTO {
    name: string;
    id: number;
    price: number;
    readonly categoryId?: number;
}
