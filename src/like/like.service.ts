/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikeDTO } from 'src/dto/like.dto';
import { Like } from 'src/entity/like.entity';
import { Product } from 'src/entity/product.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ){}

  async create(payload:LikeDTO){
    const {userId, productId} = payload
    const like = new Like()
    const user = await this.usersRepository.findOne({
      where:{id:userId}
    })
    const product = await this.productsRepository.findOne({
      where:{id:productId}
    })
    like.user = user
    like.product = product
    return await this.likesRepository.save(like)
  }
}
