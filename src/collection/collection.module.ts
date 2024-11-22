import { Module } from "@nestjs/common";
import { CollectionController } from "./collection.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { ProductModule } from "src/product/product.module";
import { CollectionService } from "./collection.service";
import { MyCollection } from "src/entity/collection.entity";

@Module({
  imports: [TypeOrmModule.forFeature([MyCollection, User]), ProductModule], // Import Category entity
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}
