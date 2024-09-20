/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/entity/like.entity';
import { LikeController } from './like.controller';
import { User } from 'src/entity/user.entity';
import { Product } from 'src/entity/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, User, Product])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
