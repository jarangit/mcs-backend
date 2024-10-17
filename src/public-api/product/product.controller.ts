import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }
  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productService.getProductById(+id);
  }

  @Get("user/:userId")
  getProductByUserId(@Param("userId") userId: string) {
    return this.productService.findByUserId(+userId);
  }

  @Get("view/:id")
  async viewProduct(@Param("id") id: number): Promise<void> {
    await this.productService.incrementViewCount(id);
  }
}
