import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { createSlug, randomId } from "src/common/utils/functions.util";
import { CategoryEntity } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  AuthMessage,
  NotFoundMessage,
  PublicMessage,
} from "../auth/enums/message.enum";
import { CategoryImages } from "./types/files.type";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @Inject(REQUEST) private request: Request
  ) {}

  async create(file: CategoryImages, createCategoryDto: CreateCategoryDto) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

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
  async createWithTitle(title: string) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    let slug = title;
    let slugData = slug ?? title;
    slug = createSlug(slugData);

    const isExist = await this.checkCategoryBySlug(slug);
    if (isExist) {
      slug += `-${randomId()}`;
    }

    let category = this.categoryRepository.create({
      title,
      slug,
    });

    category = await this.categoryRepository.save(category);
    return category;
  }

  async findAll() {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findById(id: number) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(NotFoundMessage.CategoryNotFount);
    return category;
  }
  async findBySlug(slug: string) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    let slugData = createSlug(slug);
    const category = await this.categoryRepository.findOneBy({
      slug: slugData,
    });

    if (!category)
      throw new NotFoundException(NotFoundMessage.CategoryNotFount);
    return category;
  }

  async update(
    id: number,
    file: CategoryImages,
    updateCategoryDto: UpdateCategoryDto
  ) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    if (file?.image?.length > 0) {
      let [image] = file?.image;
      updateCategoryDto.image = image?.path?.slice(7);
    }

    let { title, slug, description, image } = updateCategoryDto;
    const oldCategory = await this.findById(id);

    if (title) oldCategory.title = title;
    if (slug) {
      slug = createSlug(slug);
      const isExist = await this.checkCategoryBySlug(slug);
      if (isExist) {
        slug += `-${randomId()}`;
      }
      oldCategory.slug = slug;
    }
    if (description) oldCategory.description = description;
    if (image) oldCategory.image = image;

    this.categoryRepository.update(
      { id },
      {
        title,
        slug,
        description,
        image,
      }
    );

    return {
      message: PublicMessage.Updated,
    };
  }

  async remove(id: number) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category)
      throw new NotFoundException(NotFoundMessage.CategoryNotFount);

    await this.categoryRepository.delete({ id });
    return {
      message: PublicMessage.Deleted,
    };
  }

  // Helpers
  async checkCategoryBySlug(slug: string) {
    let slugData = createSlug(slug);
    const category = await this.categoryRepository.findOneBy({
      slug: slugData,
    });
    return category;
  }
}
