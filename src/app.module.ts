import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { join } from "path";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfig } from "./config/typeorm.config";
import { ClinicModule } from "./modules/clinic/clinic.module";
import { CategoryModule } from "./modules/category/category.module";
import { PlannerModule } from "./modules/planner/planner.module";
import { TransactionsModule } from "./modules/transactions/transactions.module";
import { ReservationModule } from "./modules/reservation/reservation.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), ".env"),
    }),
    TypeOrmModule.forRoot(TypeOrmConfig()),
    AuthModule,
    UserModule,
    ClinicModule,
    CategoryModule,
    PlannerModule,
    ReservationModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
