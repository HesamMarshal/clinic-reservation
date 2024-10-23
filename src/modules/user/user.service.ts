import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { ChangeNameDto } from "./dto/user.dto";
import { REQUEST } from "@nestjs/core";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import {
  AuthMessage,
  NotFoundMessage,
  PublicMessage,
} from "../auth/enums/message.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @Inject(REQUEST) private request: Request
  ) {}
  findAll() {
    const result = this.userRepository.find();

    return result;
  }

  async findOne() {
    //  get user from token
    const { user } = this?.request;
    console.log(user);
    if (!user) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = user;
    const result = await this.userRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return result;
  }

  async update(changeNameDto: ChangeNameDto) {
    //  get user from token
    const { first_name, last_name } = changeNameDto;
    const { id } = this.request.user;
    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(NotFoundMessage.UserNotFount);

    await this.userRepository.update({ id }, { first_name, last_name });
    return { message: PublicMessage.Updated };
  }

  async remove() {
    const { id } = this.request.user;
    const user = await this.userRepository.findOneBy({ id });
    this.userRepository.remove(user);
    return { message: PublicMessage.Deleted };
  }
}
