/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { CollectionService } from './collection.service';
import { MyCollection } from 'src/entity/collection.entity';

@Controller('auth/collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) { }

  @Post('/create')
  create(@Req() req: Request, @Body() body: Partial<MyCollection>): Promise<MyCollection> {
    const user = req['user'];
    return this.collectionService.create({ collection: body, userId: user.id });
  }

  @Put('/update/:id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: Partial<MyCollection>
  ) {
    const user = req['user'];
    return this.collectionService.update({ collectionId: id, data, userId: user.id })
  }

  @Delete('/:id')
  delete(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const user = req['user']
    return this.collectionService.delete({ collectionId: id, userId: user.id })
  }

  @Get('/list')
  getAllByUserId(@Req() req: Request,) {
    const user = req['user'];
    return this.collectionService.getAllByUserId(user.id)
  }
}
