import { ApiProperty } from "@nestjs/swagger";
import { PaymentStatus } from "../types/status.enum";

export class CreateReservationDto {
  @ApiProperty()
  clinicId: number;
  @ApiProperty()
  start_visit_time: number;
  @ApiProperty()
  finish_visit_time: number;
  @ApiProperty()
  date: Date;
}
