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
}
