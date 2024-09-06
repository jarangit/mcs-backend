import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from 'src/entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // เพิ่มบรรทัดนี้
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
