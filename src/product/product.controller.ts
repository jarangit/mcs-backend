/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { ProductDTO } from 'src/dto/product.dto';
import { ProductService } from './product.service';
import { Product } from 'src/entity/product.entity';

@Controller('auth/products')
export class ProductController {
  constructor(private readonly productsService: ProductService) { }

  @Post('/create')
  create(@Req() req: Request, @Body() product: Partial<Product>): Promise<Product> {
    const user = req['user'];
    return this.productsService.create({ product, userId: user.id });
  }

  @Put('update/:productId')
  update(
    @Param('productId') productId: string,
    @Req() req: Request,
    @Body() product: Partial<Product>,

  ) {
    const user = req['user'];
    return this.productsService.updateProduct({
      userId: user.id, productData: product,
      id: +productId
    })
  }

  @Get()
  async findAll(): Promise<Product[]> {
    const res = await this.productsService.findAll();
    return res;
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Product[]> {
    const res = await this.productsService.findProductByUserId(+userId);
    return res;
  }

  @Get('category/:categoryId')
  async findByCategoryId(
    @Param('categoryId') id: string,
  ): Promise<Product[]> {
    const res = await this.productsService.findProductByCategoryId(+id);
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
