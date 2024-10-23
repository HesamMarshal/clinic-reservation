import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { PlannerService } from "./planner.service";
import { CreatePlannerDto } from "./dto/create-planner.dto";
import { UpdatePlannerDto } from "./dto/update-planner.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("planner")
@ApiTags("Planner")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post()
  create(@Body() createPlannerDto: CreatePlannerDto) {
    return this.plannerService.create(createPlannerDto);
  }

  @Get()
  findAll() {
    return this.plannerService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.plannerService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePlannerDto: UpdatePlannerDto) {
    return this.plannerService.update(+id, updatePlannerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.plannerService.remove(+id);
  }
}
