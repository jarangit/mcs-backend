import { Test, TestingModule } from '@nestjs/testing';
import { StCategoryService } from './st-category.service';

describe('StCategoryService', () => {
  let service: StCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StCategoryService],
    }).compile();

    service = module.get<StCategoryService>(StCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
