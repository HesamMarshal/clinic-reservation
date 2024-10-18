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
import { CreateClinicDto } from "./dto/create-clinic.dto";
import { UpdateClinicDto } from "./dto/update-clinic.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller("clinic")
@ApiTags("Clinic")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Post()
  create(@Body() createClinicDto: CreateClinicDto) {
    return this.clinicService.create(createClinicDto);
  }

  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.clinicService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(+id, updateClinicDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.clinicService.remove(+id);
  }
}
