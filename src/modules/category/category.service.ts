import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { createSlug, randomId } from "src/common/utils/functions.util";
import { CategoryEntity } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotFoundMessage, PublicMessage } from "../auth/enums/message.enum";
import { CategoryImages } from "./types/files.type";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) {}

  async create(file: CategoryImages, createCategoryDto: CreateCategoryDto) {
    if (file?.image?.length > 0) {
      let [image] = file?.image;
      createCategoryDto.image = image?.path?.slice(7);
    }

    let { title, slug, description, image } = createCategoryDto;
    let slugData = slug ?? title;
    slug = createSlug(slugData);

    const isExist = await this.checkCategoryBySlug(slug);
    if (isExist) {
      slug += `-${randomId()}`;
    }

    let category = this.categoryRepository.create({
      title,
      slug,
      description,
      image,
    });

    category = await this.categoryRepository.save(category);
    return {
      message: PublicMessage.Created,
    };
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findById(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(NotFoundMessage.CategoryNotFount);
    return category;
  }
  async findBySlug(slug: string) {
    let slugData = createSlug(slug);
    const category = await this.categoryRepository.findOneBy({
      slug: slugData,
    });

    if (!category)
      throw new NotFoundException(NotFoundMessage.CategoryNotFount);
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  // Helpers
  async checkCategoryBySlug(slug: string) {
    const category = await this.categoryRepository.findOneBy({ slug });
    return category;
  }
}
