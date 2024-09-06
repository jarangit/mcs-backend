import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/entity/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Post('/create')
  create(@Body() product: Partial<Product>): Promise<Product> {
    return this.productsService.create(product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    const res = await this.productsService.findAll();
    return res;
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
