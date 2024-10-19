import { Injectable } from "@nestjs/common";
import { CreateStCategoryDto } from "./dto/create-st-category.dto";
import { UpdateStCategoryDto } from "./dto/update-st-category.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { StCategory } from "src/entity/st-category.entity";

@Injectable()
export class StCategoryService {
  constructor(
    // private readonly stCategoryRepository: StCategoryRepository
    @InjectRepository(StCategory)
    private readonly stCategoryRepository: Repository<StCategory>,
  ) { }
  async create(createStCategoryDto: CreateStCategoryDto) {
    console.log(
      "🚀 ~ StCategoryService ~ create ~ createStCategoryDto:",
      createStCategoryDto,
    );
    return await this.stCategoryRepository.save(createStCategoryDto);
  }

  async findAll() {
    return await this.stCategoryRepository.find({
      select: ["id", "name", "description"],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} stCategory`;
  }

  update(id: number, updateStCategoryDto: UpdateStCategoryDto) {
    return `This action updates a #${id} stCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} stCategory`;
  }
}
