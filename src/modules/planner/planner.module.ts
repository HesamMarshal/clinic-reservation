import { Module } from "@nestjs/common";
import { PlannerService } from "./planner.service";
import { PlannerController } from "./planner.controller";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlannerEntity } from "./entities/planner.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([PlannerEntity])],
  controllers: [PlannerController],
  providers: [PlannerService],
})
export class PlannerModule {}
