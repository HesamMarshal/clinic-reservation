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
import { ReservationEntity } from "../reservation/entities/reservation.entity";

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    TypeOrmModule.forFeature([
      UserEntity,
      OtpEntity,
      ClinicEntity,
      CategoryEntity,
      ReservationEntity,
    ]),
  ],
  controllers: [ClinicController],
  providers: [ClinicService, CategoryService],
  exports: [ClinicService],
})
export class ClinicModule {}
