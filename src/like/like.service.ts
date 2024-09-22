import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
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
        private productsRepository: Repository<Product>,
    ) {}

    async create(payload: LikeDTO) {
        const { userId, productId } = payload;
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
        const product = await this.productsRepository.findOne({
            where: { id: productId },
        });
        if (product) {
            const data = {
                user,
                product,
            };
            return await this.likesRepository.save(data);
        } else {
            throw new HttpException('Not found product', HttpStatus.NOT_FOUND);
        }
    }

    async toggle(payload: LikeDTO) {
        // check user use to like this product already
        // if yes do like
        // if no unlike
        const { userId, productId } = payload;
        const foundLiked = await this.likesRepository.findOne({
            where: {
                user: { id: userId },
                product: { id: productId },
            },
        });
        if (foundLiked) {
            // do liked
            return await this.unlike(foundLiked.id);
        } else {
            // do unlike
            return await this.create({ ...payload });
        }
    }

    async unlike(id: number) {
        const foundLike = await this.likesRepository.findOne({
            where: { id: +id },
        });
        if (foundLike) {
            return this.likesRepository.remove(foundLike);
        } else {
            throw new NotFoundException('Not found liked');
        }
    }

    async getByProductId(productId: number) {
        const likes = await this.likesRepository.find({
            where: { product: { id: productId } },
            relations: ['user'],
        });
        return likes;
    }
}
