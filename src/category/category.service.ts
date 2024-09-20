import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create({
        category,
        userId,
    }: {
        category: Partial<Category>;
        userId: number;
    }) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        try {
            if (user) {
                const newCat = this.categoryRepository.create({
                    ...category,
                    user,
                });
                return this.categoryRepository.save(newCat);
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}
