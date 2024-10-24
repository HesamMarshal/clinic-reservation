import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreatePlannerDto } from "./dto/create-planner.dto";
import { UpdatePlannerDto } from "./dto/update-planner.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import {
  AuthMessage,
  NotFoundMessage,
  PublicMessage,
} from "../auth/enums/message.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { PlannerEntity } from "./entities/planner.entity";
import { Repository } from "typeorm";

@Injectable()
export class PlannerService {
  constructor(
    @InjectRepository(PlannerEntity)
    private plannerRepository: Repository<PlannerEntity>,

    @Inject(REQUEST) private request: Request
  ) {}
  async create(createPlannerDto: CreatePlannerDto) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    const { id } = clinic;
    const { dayName, day_number, finish_time, start_time, status } =
      createPlannerDto;

    await this.plannerRepository.insert({
      clinicId: id,
      dayName,
      day_number,
      finish_time,
      start_time,
      status,
    });
    return { message: PublicMessage.Created };
  }

  async findAll() {
    const plans = await this.plannerRepository.find();
    if (!plans) throw new NotFoundException(NotFoundMessage.PlanNotFound);
    return plans;
  }

  async findMyPlans() {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    const { id } = clinic;
    const plans = await this.plannerRepository.find({
      where: { clinicId: id },
    });
    if (!plans) throw new NotFoundException(NotFoundMessage.PlanNotFound);
    return plans;
  }

  update(id: number, updatePlannerDto: UpdatePlannerDto) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    return `This action updates a #${id} planner`;
  }

  remove(id: number) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    return `This action removes a #${id} planner`;
  }
}
