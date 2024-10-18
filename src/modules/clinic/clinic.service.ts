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

  async update(updateClinicDto: UpdateClinicDto) {
    //  get user from token
    const { first_name, last_name, address, mobile_no } = updateClinicDto;
    const { id } = this.request.clinic;
    const user = await this.clinicRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(NotFoundMessage.ClinicNotFount);

    await this.clinicRepository.update(
      { id },
      { first_name, last_name, address, mobile_no }
    );
    return { message: PublicMessage.Updated };
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`;
  }
}
