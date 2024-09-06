import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {}

    create(product: Partial<Product>): Promise<Product> {
        const newProduct = this.productsRepository.create(product);
        return this.productsRepository.save(newProduct);
    }
    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    findById(id: number) {
        return this.productsRepository.findOneBy({ id });
    }

    // findByCond(predicate: (product: ProductDTO) => boolean) {
    //   return this.productsRepository.filter((item) => predicate(item));
    // }

    async remove(id: number): Promise<void> {
        await this.productsRepository.delete(id);
    }
}
