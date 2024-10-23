import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class AuthDto {
  @ApiProperty()
  @IsString()
  @Length(11)
  mobile: string;

  // @ApiProperty({ enum: AuthType })
  // @IsEnum(AuthType)
  // type: string;

  // @ApiProperty({ enum: UserType })
  // @IsEnum(UserType)
  // userType: UserType;
}

export class CheckOtpDto {
  @ApiProperty()
  @IsString()
  @Length(5, 5)
  code: string;
}
