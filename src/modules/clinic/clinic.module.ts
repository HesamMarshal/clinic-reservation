import { Module } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { ClinicController } from "./clinic.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { OtpEntity } from "../user/entities/otp.entity";
import { ClinicEntity } from "./entities/clinic.entity";
import { CategoryEntity } from "../category/entities/category.entity";
import { CategoryService } from "../category/category.service";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    TypeOrmModule.forFeature([
      UserEntity,
      OtpEntity,
      ClinicEntity,
      CategoryEntity,
    ]),
  ],
  controllers: [ClinicController],
  providers: [ClinicService, CategoryService],
})
export class ClinicModule {}
