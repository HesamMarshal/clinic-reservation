import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UpdateClinicDto } from "./dto/update-clinic.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ClinicEntity } from "./entities/clinic.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import {
  AuthMessage,
  NotFoundMessage,
  PublicMessage,
} from "../auth/enums/message.enum";
import { Request } from "express";

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(ClinicEntity)
    private clinicRepository: Repository<ClinicEntity>,

    @Inject(REQUEST) private request: Request
  ) {}
  create() {
    return "This action adds a new clinic";
  }
  findAll() {
    const result = this.clinicRepository.find();

    return result;
  }

  async findOne() {
    //  get clinic from token
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.LoginAgain);
    const { id } = clinic;
    const result = await this.clinicRepository.findOneBy({ id });
    if (!result) throw new NotFoundException(NotFoundMessage.UserNotFount);
    return result;
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`;
  }
}
