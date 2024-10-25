import { Module } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { ReservationController } from "./reservation.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservationEntity } from "./entities/reservation.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
