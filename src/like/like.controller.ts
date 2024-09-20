/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('auth/likes')
export class LikeController {
  constructor(
    private readonly likeService: LikeService
  ) { }

  @Post('/create/:productId')
  create(
    @Param('productId') productId: string,
    @Req() req: Request
  ) {
    const user = req['user']
    return this.likeService.create({ userId: user.id, productId: +productId })
  }

  @Get('/product/:productId')
  getByProductId(
    @Param('productId') productId: string
  ) {
    return this.likeService.getByProductId(+productId)
  }
}
