import { PartialType } from "@nestjs/swagger";
import { ClinicDto } from "./clinic.dto";

export class UpdateClinicDto extends PartialType(ClinicDto) {}
