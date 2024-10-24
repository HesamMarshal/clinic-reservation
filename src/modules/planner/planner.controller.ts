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
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SwaggerConsumes } from "src/common/swagger-consume.enum";

@Controller("planner")
@ApiTags("Planner")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class PlannerController {
  constructor(private readonly plannerService: PlannerService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createPlannerDto: CreatePlannerDto) {
    return this.plannerService.create(createPlannerDto);
  }

  @Get()
  findAll() {
    return this.plannerService.findAll();
  }

  @Get("/my")
  findMyPlans() {
    return this.plannerService.findMyPlans();
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
