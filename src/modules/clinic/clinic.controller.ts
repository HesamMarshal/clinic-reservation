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
import { ClinicService } from "./clinic.service";

import { UpdateClinicDto } from "./dto/update-clinic.dto";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SwaggerConsumes } from "src/common/swagger-consume.enum";

@Controller("clinic")
@ApiTags("Clinic")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  findAll() {
    //  this section only must be availbale for admins.
    //  we implemented this just to make it easier for implementation.
    return this.clinicService.findAll();
  }

  @Get("/my")
  findOne() {
    return this.clinicService.findOne();
  }

  @Patch("")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(@Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(updateClinicDto);
  }

  @Delete()
  remove() {
    return this.clinicService.remove();
  }
}
