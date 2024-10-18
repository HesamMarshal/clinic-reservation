import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entities/user.entity";
import { OtpEntity } from "../user/entities/otp.entity";
import { TokenService } from "./tokens.service";
import { JwtService } from "@nestjs/jwt";
import { ClinicEntity } from "../clinic/entities/clinic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OtpEntity, ClinicEntity])],
  controllers: [AuthController],
  providers: [AuthService, JwtService, TokenService],
  exports: [AuthService, JwtService, TokenService, TypeOrmModule],
})
export class AuthModule {}
