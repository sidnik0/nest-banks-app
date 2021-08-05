import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionInterface } from './interfaces/transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionInterface> {
    console.log(`Create transaction`);

    return this.transactionsService.create(createTransactionDto);
  }

  @Get(':id')
  async getById(@Param() id: string): Promise<TransactionInterface> {
    console.log(`Get transaction by id: ${id}`);

    const transaction = this.transactionsService.getById(id);

    return transaction || null;
  }

  @Get()
  async get(): Promise<Map<string, TransactionInterface>> {
    console.log(`Get all transactions`);

    const transactions = this.transactionsService.get();

    return transactions.size ? transactions : null;
  }
}
