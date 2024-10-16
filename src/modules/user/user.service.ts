import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangeNameDto } from "./dto/user.dto";
import { REQUEST } from "@nestjs/core";
import { UserEntity } from "./entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { NotFoundMessage, PublicMessage } from "../auth/enums/message.enum";

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
    const { id } = this.request.user;
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return user;
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
