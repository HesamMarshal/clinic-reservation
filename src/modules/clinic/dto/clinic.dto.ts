import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMobilePhone, Length } from "class-validator";
import { ValidationMessage } from "src/modules/auth/enums/message.enum";

export class ClinicDto {
  @ApiPropertyOptional()
  @Length(3, 50)
  first_name: string;

  @ApiPropertyOptional()
  @Length(3, 50)
  last_name: string;

  @ApiProperty()
  @IsMobilePhone("fa-IR", {}, { message: ValidationMessage.InvalidPhoneForamt })
  mobile_no: string;

  @ApiPropertyOptional()
  @Length(10, 200)
  address: string;
}
