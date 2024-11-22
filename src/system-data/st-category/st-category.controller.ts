import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StCategoryService } from './st-category.service';
import { CreateStCategoryDto } from './dto/create-st-category.dto';
import { UpdateStCategoryDto } from './dto/update-st-category.dto';

@Controller('/system/st-category')
export class StCategoryController {
  constructor(private readonly stCategoryService: StCategoryService) {}

  @Post()
  create(@Body() createStCategoryDto: CreateStCategoryDto) {
    return this.stCategoryService.create(createStCategoryDto);
  }

  @Get()
  findAll() {
    return this.stCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStCategoryDto: UpdateStCategoryDto) {
    return this.stCategoryService.update(+id, updateStCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stCategoryService.remove(+id);
  }
}
