import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/swagger-consume.enum";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { multerStorage } from "src/common/utils/multer.util";
import { CategoryImages } from "./types/files.type";
import { UploadedOptionalFiles } from "src/common/decorators/upload-file.decorator";

@Controller("category")
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "image", maxCount: 1 }], {
      storage: multerStorage("category-image"),
    })
  )
  create(
    @UploadedOptionalFiles() file: CategoryImages,
    @Body() createCategoryDto: CreateCategoryDto
  ) {
    return this.categoryService.create(file, createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.categoryService.findById(+id);
  }
  @Get("slug/:slug")
  findBySlug(@Param("slug") slug: string) {
    return this.categoryService.findBySlug(slug);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoryService.remove(+id);
  }
}
