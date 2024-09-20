/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import { User } from 'src/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])], // Import Category entity
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule { }
