import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    this.transactionsService.create(createTransactionDto);

    console.log(`Create transaction`);
  }

  @Get(':id')
  async getById(@Param() id: string): Promise<void> {
    this.transactionsService.getById(id);

    console.log(`Get transaction by id: ${id}`);
  }

  @Get()
  async get(): Promise<void> {
    this.transactionsService.get();

    console.log(`Get all transactions`);
  }
}
