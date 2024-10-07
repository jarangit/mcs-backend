import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Product } from "src/entity/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { Category } from "src/entity/category.entity";
import { UtilsModule } from "src/utils/utils.module";
import { Collection } from "src/entity/collection.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User, Category, Collection]),
    UtilsModule,
  ], // เพิ่มบรรทัดนี้
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
