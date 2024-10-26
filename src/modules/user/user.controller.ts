import { Controller, Get, Body, Delete, UseGuards, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../auth/guards/auth.guard";
import { SwaggerConsumes } from "src/common/swagger-consume.enum";
import { ChangeNameDto } from "./dto/user.dto";

@Controller("user")
@ApiTags("User")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("for-admin")
  findAll() {
    //  this section only must be availbale for admins.
    //  we implemented this just to make it easier for implementation.

    return this.userService.findAll();
  }

  @Get("my")
  findOne() {
    return this.userService.findOne();
  }

  @Put("edit-name")
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(@Body() changeNameDto: ChangeNameDto) {
    return this.userService.update(changeNameDto);
  }

  @Delete("")
  remove() {
    return this.userService.remove();
  }
}
