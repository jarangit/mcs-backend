import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  queryProduct: any = {
    select: {
      user: {
        id: true, // เลือกเฉพาะฟิลด์ที่ต้องการของ user
        username: true, // เช่น username
        email: true,
        profileImage: true,
      },
      likes: {
        id: true,
        user: {
          id: true, // ดึงเฉพาะข้อมูล user ที่ต้องการใน likes เช่น id และ username
          username: true,
          email: true,
          profileImage: true,
        },
      },
    },
  };
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async incrementViewCount(productId: number): Promise<void> {
    await this.productRepository.increment({ id: productId }, "viewCount", 1);
  }

  async getProducts() {
    const products: any[] = await this.productRepository.find({
      relations: ["user", "likes", "likes.user"],
      ...this.queryProduct,
    });
    products.forEach((product) => {
      product.totalLikes = product.likes.length; // คำนวณจำนวนไลก์
    });
    return products;
  }

  async getProductById(id: number) {
    const product: any = await this.productRepository.findOne({
      where: { id },
      relations: ["user", "collection"],
    });
    if (product.user) {
      product.user.password = undefined;
    }
    return product;
  }

  async findByUserId(userId: number) {
    return await this.productRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "likes", "likes.user", "collection"],
      ...this.queryProduct,
    });
  }
}
