/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/entity/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) { }

  @Post('/create')
  create(@Body() body: { product: Partial<Product>, userId: number }): Promise<Product> {
    const { product, userId } = body
    console.table(body)
    return this.productsService.create({product,userId});
  }

  @Get()
  async findAll(): Promise<Product[]> {
    const res = await this.productsService.findAll();
    return res;
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId:string): Promise<Product[]> {
    const res = await this.productsService.findProductByUserId(+userId);
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
