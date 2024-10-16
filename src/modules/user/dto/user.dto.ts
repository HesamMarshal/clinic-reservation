import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsMobilePhone, IsOptional, Length } from "class-validator";
import { ValidationMessage } from "src/modules/auth/enums/message.enum";

export class UserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 50)
  first_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(3, 50)
  last_name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsMobilePhone("fa-IR", {}, { message: ValidationMessage.InvalidPhoneForamt })
  @Length(11)
  mobile: string;
}

export class ChangeNameDto {
  @ApiPropertyOptional()
  @Length(3, 50)
  first_name: string;

  @ApiPropertyOptional()
  @Length(3, 50)
  last_name: string;
}

export class ChangePhoneDto {
  @ApiProperty()
  @IsMobilePhone("fa-IR", {}, { message: ValidationMessage.InvalidPhoneForamt })
  phone: string;
}
