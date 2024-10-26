import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
  @ApiProperty()
  clinicId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  reservationId: number;
}
