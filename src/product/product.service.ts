/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { error } from "console";
import { ProductDTO } from "src/dto/product.dto";
import { Category } from "src/entity/category.entity";
import { Collection } from "src/entity/collection.entity";
import { Product } from "src/entity/product.entity";
import { User } from "src/entity/user.entity";
import { UtilsService } from "src/utils/utils.service";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    @InjectRepository(Collection)
    private collectionRepository: Repository<Collection>,

    private readonly utilsService: UtilsService,
  ) { }

  async create({
    product,
    userId,
  }: {
    product: Partial<ProductDTO>;
    userId: number;
  }): Promise<Product> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (user) {
      const collection = await this.collectionRepository.findOne({
        where: { id: product.collectionId },
      })
      const newProduct = this.productsRepository.create({
        ...product,
        user,
        collection: collection ?? null,
      });
      return this.productsRepository.save(newProduct);
    } else {
      throw new Error("User not found");
    }
  }

  async updateProduct(payload: {
    id: number;
    productData: Partial<ProductDTO>;
    userId: number;
  }) {
    const { id, productData, userId } = payload;
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (productData.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: productData.categoryId },
      });
      product.category = category;
    }
    const isOwner = product.user.id === userId;
    if (!product && !isOwner) {
      throw new NotFoundException("not found product");
    }
    Object.assign(product, productData);
    return await this.productsRepository.save(product);
  }


  async findAll(): Promise<ProductDTO[]> {
    const products: ProductDTO[] = await this.productsRepository.find({
      relations: ["user"],
    });
    products.forEach(async (p: any) => {
      if (p && p.user) {
        p.user = await this.utilsService.removeKeysObj({
          obj: p.user,
          keysToRemove: ["password"],
        });
      }
    });
    return products;
  }

  async findProductByUserId(userId: number): Promise<Product[]> {
    const res = await this.productsRepository.find({
      where: { user: { id: userId } },
      relations: ["collection"],
    });
    return res;
  }

  async findProductByCategoryId(categoryId: number): Promise<Product[]> {
    const res = await this.productsRepository.find({
      where: { category: { id: categoryId } },
    });
    return res;
  }
  async findProductByCollectionId(collectionId: number): Promise<Product[]> {
    const res = await this.productsRepository.find({
      where: { category: { id: collectionId } },
    });
    return res;
  }

  findById(id: number) {
    return this.productsRepository.findOne({
      where: { id },
      relations: ["user", "collection"],
    });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
