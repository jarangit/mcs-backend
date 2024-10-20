/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { error } from "console";
import { ProductDTO } from "src/dto/product.dto";
import { Category } from "src/entity/category.entity";
import { Collection } from "src/entity/collection.entity";
import { Like } from "src/entity/like.entity";
import { Product } from "src/entity/product.entity";
import { StCategory } from "src/entity/st-category.entity";
import { User } from "src/entity/user.entity";
import { UtilsService } from "src/utils/utils.service";
import { Repository } from "typeorm";

const mockUrlImage = [
  'https://img.freepik.com/free-photo/autumn-landscape-background-illustration_23-2151844215.jpg?t=st=1728354534~exp=1728358134~hmac=63253537ffc611fe7232ea8f64d39bc810b196b0a278d541bbb791e899add082&w=740',
  'https://img.freepik.com/premium-vector/farm-landscape-farm-field-retro-sketch-hand-drawn-rural-area-farm-sketch-farm-drawing_1168528-4825.jpg?w=1380',
  'https://img.freepik.com/free-photo/retro-cameras_144627-12214.jpg?t=st=1728830732~exp=1728834332~hmac=7df6f0ba72894caa9e344f378b120d60c98ad9b652b8e235b848c3bba07e7567&w=2000',
  'https://img.freepik.com/free-photo/headstock-classical-fingerboard-wood-fretboard_1172-289.jpg?ga=GA1.1.1806154199.1728353290&semt=ais_hybrid-rr-similar',
  'https://img.freepik.com/free-photo/electric-guitar-still-life_23-2151376253.jpg?ga=GA1.1.1806154199.1728353290&semt=ais_hybrid-rr-similar',
  'https://img.freepik.com/free-photo/colorful-slip-unisex-streetwear-sneakers-fashion_53876-101518.jpg?t=st=1728830655~exp=1728834255~hmac=a1032442c0a40b0b73b178e2b87bfcf864aa951fcfac6aeefe3236821bfc704a&w=2000'

]
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

    @InjectRepository(StCategory)
    private stCategoryRepository: Repository<StCategory>,

    @InjectRepository(Like)
    private likeRepository: Repository<Like>,

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

    const mockData = {
      description: "การวาดภาพทะเลทำให้ฉันรู้สึกถึงความสงบและอิสระของธรรมชาติ เส้นขอบฟ้าที่เชื่อมต่อระหว่างน้ำและฟ้าสะท้อนถึงความไม่มีที่สิ้นสุดของจินตนาการ เสียงคลื่นที่กระทบฝั่งช่วยให้ฉันปล่อยความคิดและเติมพลังสร้างสรรค์ในทุกลายเส้น"
    }


    if (user) {
      const collection = await this.collectionRepository.findOne({
        where: { id: product.collectionId },
      })
      const stCategory = await this.stCategoryRepository.findOne({
        where: { id: product.STCategoryId },
      })
      console.log("🚀 ~ ProductService ~ stCategory:", stCategory)
      const newProduct = this.productsRepository.create({
        ...product,
        thumbnail: this.utilsService.getRandomImg(mockUrlImage),
        description: mockData.description,
        user,
        collection: collection ?? null,
        STCategory: stCategory ?? null,
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
      relations: ["collection", "user", "STCategory"],
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

  async remove(productId: number): Promise<void> {
    await this.likeRepository.delete({ product: { id: productId } });
    await this.productsRepository.delete(productId);
  }
}
