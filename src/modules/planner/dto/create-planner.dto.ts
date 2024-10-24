import { ApiProperty } from "@nestjs/swagger";

import { IsEnum } from "class-validator";
import { DayName } from "../types/dayName.enum";

export class CreatePlannerDto {
  @ApiProperty({ enum: DayName })
  @IsEnum(DayName)
  dayName: string;

  @ApiProperty()
  day_number: number;

  @ApiProperty()
  start_time: number;

  @ApiProperty()
  finish_time: number;

  @ApiProperty()
  status: boolean;
}
