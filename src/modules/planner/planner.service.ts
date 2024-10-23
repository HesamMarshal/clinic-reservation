import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreatePlannerDto } from "./dto/create-planner.dto";
import { UpdatePlannerDto } from "./dto/update-planner.dto";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { AuthMessage } from "../auth/enums/message.enum";

@Injectable()
export class PlannerService {
  constructor(@Inject(REQUEST) private request: Request) {}
  create(createPlannerDto: CreatePlannerDto) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    return "This action adds a new planner";
  }

  findAll() {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    return `This action returns all planner`;
  }

  findOne(id: number) {
    // if the logged in user is not a clinic can work on category
    const { clinic } = this?.request;
    if (!clinic) throw new UnauthorizedException(AuthMessage.ClinicLogin);
    return `This action returns a #${id} planner`;
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
