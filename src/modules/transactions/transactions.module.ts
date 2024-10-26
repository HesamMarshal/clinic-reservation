import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionEntity } from "./entities/transaction.entity";
import { AuthModule } from "../auth/auth.module";
import { ClinicEntity } from "../clinic/entities/clinic.entity";
import { ClinicModule } from "../clinic/clinic.module";
import { ReservationEntity } from "../reservation/entities/reservation.entity";

@Module({
  imports: [
    AuthModule,
    ClinicModule,
    TypeOrmModule.forFeature([
      TransactionEntity,
      ClinicEntity,
      ReservationEntity,
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
