import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";

export class CreateTransactionDto {
  @ApiProperty()
  //   @IsNumber()
  clinicId: number;

  @ApiProperty()
  //   @IsNumber()
  amount: number;

  @ApiProperty()
  status: boolean;

  @ApiProperty()
  //   @IsDate()
  date: Date;
}
