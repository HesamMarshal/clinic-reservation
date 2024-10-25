import {
  BadRequestException,
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
import { isTrue } from "src/common/utils/functions.util";

@Injectable()
export class PlannerService {
  constructor(
    @InjectRepository(PlannerEntity)
    private plannerRepository: Repository<PlannerEntity>,

    @Inject(REQUEST) private request: Request
  ) {}
  async create(createPlannerDto: CreatePlannerDto) {
    // if the logged in user is not a clinic can not work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);

    const { id } = clinic;
    let { dayName, day_number, finish_time, start_time, status } =
      createPlannerDto;

    if (isTrue(status)) status = true;
    else status = false;

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

  async update(id: number, updatePlannerDto: UpdatePlannerDto) {
    // if the logged in user is not a clinic can not work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    const { id: clinicId } = clinic;
    const { dayName, day_number, start_time, finish_time, status } =
      updatePlannerDto;
    const [plan] = await this.plannerRepository.find({
      where: {
        id: id,
        clinicId,
      },
    });

    if (!plan) throw new NotFoundException(NotFoundMessage.PlanNotFound);

    if (dayName) plan.dayName = dayName;
    if (day_number) plan.day_number = day_number;
    if (start_time) plan.start_time = start_time;
    if (finish_time) plan.finish_time = finish_time;
    if (isTrue(status)) plan.status = true;
    else plan.status = false;

    await this.plannerRepository.update(
      { id },
      {
        dayName: plan.dayName,
        day_number: plan.day_number,
        start_time: plan.start_time,
        finish_time: plan.finish_time,
        status: plan.status,
      }
    );
    return {
      message: PublicMessage.Updated,
      plan,
    };
  }

  async remove(id: number) {
    // if the logged in user is not a clinic can not work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    const { id: clinicId } = clinic;
    const plan = await this.plannerRepository.findOneBy({ id });
    if (!plan) throw new NotFoundException(NotFoundMessage.PlanNotFound);

    // checks if the plan belongs to the clinic
    if (plan.clinicId !== clinicId)
      throw new BadRequestException(PublicMessage.NotAlloweded);

    await this.plannerRepository.delete({ id });
    return { message: PublicMessage.Deleted };
  }
}
