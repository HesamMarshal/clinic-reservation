import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
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
import { ClinicEntity } from "../clinic/entities/clinic.entity";
import { ClinicService } from "../clinic/clinic.service";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(TransactionEntity)
    private transactionRepository: Repository<TransactionEntity>,

    private readonly clinicService: ClinicService,

    @Inject(REQUEST) private request: Request
  ) {}
  async create(createTransactionDto: CreateTransactionDto) {
    // only users can make a transaction
    const { user } = this?.request;
    if (!user) throw new UnauthorizedException(AuthMessage.UserLogin);
    const { id: userId } = user;

    const { clinicId, amount, date, status } = createTransactionDto;
    await this.clinicService.existClinic(clinicId);

    await this.transactionRepository.insert({
      userId,
      clinicId,
      amount,
      status,
      date,
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
    return `This action returns a #${id} transaction`;
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
