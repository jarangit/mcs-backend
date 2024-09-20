/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Req } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from './category.service';
import { Request } from 'express';

@Controller('auth/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) { }
  @Post('/create')
  create(@Req() req: Request, @Body() body: Partial<Category>): Promise<Category> {
    const user = req['user'];
    return this.categoryService.create({ category: body, userId: user.id });
  }
}
