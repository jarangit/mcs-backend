import { Test, TestingModule } from '@nestjs/testing';
import { StCategoryController } from './st-category.controller';
import { StCategoryService } from './st-category.service';

describe('StCategoryController', () => {
  let controller: StCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StCategoryController],
      providers: [StCategoryService],
    }).compile();

    controller = module.get<StCategoryController>(StCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
