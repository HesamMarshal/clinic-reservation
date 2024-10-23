import { Module } from "@nestjs/common";
import { PlannerService } from "./planner.service";
import { PlannerController } from "./planner.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [PlannerController],
  providers: [PlannerService],
})
export class PlannerModule {}
