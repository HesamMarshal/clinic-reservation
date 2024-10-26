import { Controller, Get, Post, Body, Param, UseGuards } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "src/common/swagger-consume.enum";
import { AuthGuard } from "../auth/guards/auth.guard";

// TODO: add user Auth and gurad
@Controller("transactions")
@ApiTags("Transactions")
@ApiBearerAuth("Authorization")
@UseGuards(AuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Get("/my")
  findMyTransactions() {
    return this.transactionsService.findMyTransactions();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.transactionsService.findOne(+id);
  }

  @Get("confirm/:id")
  confirmTransaction(@Param("id") id: string) {
    return this.transactionsService.confirmTransaction(+id);
  }
  @Get("reject/:id")
  rejectTransaction(@Param("id") id: string) {
    return this.transactionsService.rejectTransaction(+id);
  }
}
