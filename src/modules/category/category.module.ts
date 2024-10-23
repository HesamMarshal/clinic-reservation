import { Module } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
