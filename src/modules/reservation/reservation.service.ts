import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateReservationDto } from "./dto/create-reservation.dto";
import { UpdateReservationDto } from "./dto/update-reservation.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ReservationEntity } from "./entities/reservation.entity";
import { Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import {
  AuthMessage,
  PublicMessage,
  ReservationMessage,
} from "../auth/enums/message.enum";

import { PlannerEntity } from "../planner/entities/planner.entity";
import { getWeekday } from "src/common/utils/functions.util";

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private resrvationRepository: Repository<ReservationEntity>,

    @InjectRepository(PlannerEntity)
    private plannerRepository: Repository<PlannerEntity>,

    @Inject(REQUEST) private request: Request
  ) {}
  async create(createReservationDto: CreateReservationDto) {
    const { user } = this.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;

    let { clinicId, start_visit_time, finish_visit_time, date } =
      createReservationDto;

    date = new Date(date);
    const dayNumber = date.getDay();
    const weekday = getWeekday(date);
    console.log(dayNumber, weekday);
    const [planner] = await this.plannerRepository.find({
      where: {
        clinicId,
        dayName: weekday,
      },
    });
    if (!planner) throw new NotFoundException(ReservationMessage.NoPlanAtDate);
    console.log(planner);
    this.timeChecker(start_visit_time, finish_visit_time, planner);

    let reservation = await this.resrvationRepository.create({
      clinicId,
      userId,
      start_visit_time,
      finish_visit_time,
      date,
    });
    reservation = await this.resrvationRepository.save(reservation);
    console.log(reservation);

    // Do the payments (transaction)
    return {
      message: PublicMessage.Created,
      TODO: "پرداخت را با کدهای زیر انجام دهید",
      clinicId,
      // userId,
      reservationId: reservation.id,
    };
  }

  findAll() {
    const reservations = this.resrvationRepository.find();
    return reservations;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservation`;
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  // Helper methods
  timeChecker(start_time: number, finish_time: number, plan) {
    const duration = finish_time - start_time;
    if (duration <= 0)
      throw new BadRequestException(ReservationMessage.ZeroDuration);
    else if (duration > 15) {
      throw new BadRequestException(ReservationMessage.LongDuration);
    } else if (
      start_time < plan.start_time ||
      start_time > plan.finish_time ||
      finish_time < plan.start_time ||
      finish_time > plan.finish_time
    )
      throw new NotFoundException(ReservationMessage.OutOfRange);
  }
}
