import { Controller, Post, Body, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/swagger-consume.enum";
import { AuthDto, CheckOtpDto } from "./dto/auth.dto";
import { Response, Request } from "express";

@Controller("auth")
@ApiTags("Auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // user Login endpoint
  @Post("user-login")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  userExistence(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.userExistence(authDto, res);
  }

  // Clinic Login Endpoint
  @Post("clinic-login")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  clinicExistence(@Body() authDto: AuthDto, @Res() res: Response) {
    return this.authService.clinicExistence(authDto, res);
  }

  @Post("check-otp")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  checkOtp(@Body() checkOtpDto: CheckOtpDto) {
    return this.authService.checkOTP(checkOtpDto.code);
  }
}
