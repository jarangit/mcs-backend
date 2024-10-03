import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/entity/product.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async getProducts() {
    const products: any[] = await this.productRepository.find({
      relations: ["user"],
    });
    products.forEach((p) => {
      if (p.user) {
        p.user.password = undefined;
      }
    });
    return products;
  }
}
