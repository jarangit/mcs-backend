import { Module } from "@nestjs/common";
import { CollectionController } from "./collection.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { ProductModule } from "src/product/product.module";
import { CollectionService } from "./collection.service";
import { Collection } from "src/entity/collection.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Collection, User]), ProductModule], // Import Category entity
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
