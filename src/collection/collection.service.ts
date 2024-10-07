import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Collection } from "src/entity/collection.entity";
import { User } from "src/entity/user.entity";
import { ProductService } from "src/product/product.service";
import { Repository } from "typeorm";

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly productService: ProductService,
  ) { }

  async create({
    collection,
    userId,
  }: {
    collection: Partial<Collection>;
    userId: number;
  }) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    try {
      if (user) {
        const newCat = this.collectionRepository.create({
          ...collection,
          user,
        });
        return this.collectionRepository.save(newCat);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(payload: {
    collectionId: string;
    data: Partial<Collection>;
    userId: string;
  }) {
    const { collectionId, data, userId } = payload;
    const foundCat = await this.collectionRepository.findOne({
      where: { id: +collectionId },
      relations: ["user"],
    });

    if (foundCat && foundCat.user.id === +userId) {
      Object.assign(foundCat, data);
      return this.collectionRepository.save(foundCat);
    } else {
      throw new NotFoundException();
    }
  }

  async delete(payload: { collectionId: string; userId: string }) {
    const { collectionId, userId } = payload;
    const foundProduct =
      await this.productService.findProductByCollectionId(+collectionId);
    const isHasProduct = foundProduct && foundProduct.length > 0;
    if (isHasProduct) {
      throw new HttpException(
        "Product exists in this collection",
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const collection = await this.collectionRepository.findOne({
        where: { id: +collectionId },
        relations: ["user"],
      });
      if (collection && collection.user.id === +userId) {
        return await this.collectionRepository.delete(collectionId);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllByUserId(userId: number): Promise<Collection[]> {
    try {
      const res = await this.collectionRepository.find({
        where: { user: { id: userId } },
      });
      return res;
    } catch (error) {
      throw error(error);
    }
  }
}
