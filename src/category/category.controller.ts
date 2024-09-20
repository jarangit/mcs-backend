/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
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

  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: Partial<Category>
  ) {
    const user = req['user'];
    return this.categoryService.update({ categoryId: id, data, userId: user.id })
  }

  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const user = req['user']
    return this.categoryService.delete({ categoryId: id, userId: user.id })
  }

  @Get('/list')
  getAllByUserId(@Req() req: Request,) {
    const user = req['user'];
    return this.categoryService.getAllByUserId(user.id)
  }
}
