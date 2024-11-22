import { PartialType } from '@nestjs/mapped-types';
import { CreateStCategoryDto } from './create-st-category.dto';

export class UpdateStCategoryDto extends PartialType(CreateStCategoryDto) {}
