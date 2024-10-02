import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entity/category.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";

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

  async update(payload: {
    categoryId: string;
    data: Partial<Category>;
    userId: string;
  }) {
    const { categoryId, data, userId } = payload;
    const foundCat = await this.categoryRepository.findOne({
      where: { id: +categoryId },
      relations: ["user"],
    });

    if (foundCat && foundCat.user.id === +userId) {
      Object.assign(foundCat, data);
      return this.categoryRepository.save(foundCat);
    } else {
      throw new NotFoundException();
    }
  }

  async delete(payload: { categoryId: string; userId: string }) {
    const { categoryId, userId } = payload;
    try {
      const category = await this.categoryRepository.findOne({
        where: { id: +categoryId },
        relations: ["user"],
      });
      if (category && category.user.id === +userId) {
        return await this.categoryRepository.delete(categoryId);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllByUserId(userId: number): Promise<Category[]> {
    try {
      const res = await this.categoryRepository.find({
        where: { user: { id: userId } },
      });
      return res;
    } catch (error) {
      throw error(error);
    }
  }
}
