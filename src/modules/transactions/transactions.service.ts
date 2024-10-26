import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { TransactionEntity } from "./entities/transaction.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import {
  AuthMessage,
  NotFoundMessage,
  PublicMessage,
} from "../auth/enums/message.enum";
import { ClinicService } from "../clinic/clinic.service";
import { isTrue } from "src/common/utils/functions.util";
import { TransacionStatus } from "./types/status.enum";
import { ReservationEntity } from "../reservation/entities/reservation.entity";
import { PaymentStatus } from "../reservation/types/status.enum";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,

    private readonly clinicService: ClinicService,

    @Inject(REQUEST) private request: Request
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    // only users can make a transaction
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;
    let { clinicId, amount, date, reservationId } = createTransactionDto;
    // status = isTrue(status);

    await this.clinicService.existClinic(clinicId);

    await this.transactionRepository.insert({
      userId,
      clinicId,
      amount,
      // status,
      date,
      reservationId,
    });

    return {
      message: PublicMessage.Created,
    };
  }

  async findAll() {
    const transactions = await this.transactionRepository.find();
    return transactions;
  }

  async findOne(id: number) {
    // only users can make a transaction
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;
    const transaction = await this.transactionRepository.findOneBy({
      id,
    });
    return { transaction };
  }
  async confirmTransaction(id: number) {
    // only users can make a transaction
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;
    const transaction = await this.transactionRepository.findOneBy({
      id,
    });
    this.transactionRepository.update(
      { id },
      { status: TransacionStatus.Confirmed }
    );
    console.log(transaction);

    // Change status in reservation to confirmed
    await this.reservationRepository.update(
      { id: transaction.reservationId },
      { payment_status: PaymentStatus.Confirmed }
    );

    return { message: PublicMessage.Updated };
  }
  async rejectTransaction(id: number) {
    // only users can make a transaction
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;
    const transaction = await this.transactionRepository.findOneBy({
      id,
    });
    this.transactionRepository.update(
      { id },
      { status: TransacionStatus.Reject }
    );

    // Change status in reservation to confirmed
    await this.reservationRepository.update(
      { id: transaction.reservationId },
      { payment_status: PaymentStatus.Reject }
    );
    return { message: PublicMessage.Updated };
  }

  async findMyTransactions() {
    // only users can make a transaction

    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;

    const [transactions] = await this.transactionRepository.find({
      where: { userId },
    });
    if (!transactions)
      throw new NotFoundException(NotFoundMessage.TransacionNotFound);
    return transactions;
  }
}
