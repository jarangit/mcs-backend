/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDTO } from 'src/dto/product.dto';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create({
        product,
        userId,
    }: {
        product: Partial<Product>;
        userId: number;
    }): Promise<Product> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        console.table(user);

        if (user) {
            const newProduct = this.productsRepository.create({
                ...product,
                user,
            });
            return this.productsRepository.save(newProduct);
        } else {
            throw new Error('User not found');
        }
    }

    async findAll(): Promise<Product[]> {
        return this.productsRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .select(['product', 'user.id', 'user.username'])
            .getMany();
    }

    async findProductByUserId(userId: number): Promise<Product[]> {
        const res = this.productsRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
        return res;
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
