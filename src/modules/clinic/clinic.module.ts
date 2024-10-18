import { Module } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { ClinicController } from "./clinic.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { OtpEntity } from "../user/entities/otp.entity";
import { ClinicEntity } from "./entities/clinic.entity";

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, OtpEntity, ClinicEntity]),
  ],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
