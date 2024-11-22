import { Module } from "@nestjs/common";
import { StCategoryService } from "./st-category.service";
import { StCategoryController } from "./st-category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StCategory } from "src/entity/st-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StCategory])],
  controllers: [StCategoryController],
  providers: [StCategoryService],
})
export class StCategoryModule {}
