import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { BaseController } from './base.controller';
import { CommandName } from '../../types/command-name.type';
import { TransactionModel } from '../../model/interface/transaction.model';
import { CreateTransactionDto } from './rest-dto/create-transaction.dto';
import { GetAllTransactionsByAccountDto } from './rest-dto/get-all-transactions-by-account.dto';

@Controller('transactions')
export class TransactionController extends BaseController {
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<void> {
    await this.executeCommand({ name: CommandName.CREATE_TRANSACTION, params: createTransactionDto });
  }

  @Get('account/:id')
  async getAllByAccount(
    @Param('id') id: string,
    @Query() getAllTransactionsByAccountDto: GetAllTransactionsByAccountDto,
  ): Promise<TransactionModel[]> {
    return await this.executeCommand({
      name: CommandName.GET_ALL_TRANSACTIONS_BY_ACCOUNT,
      params: { id, ...getAllTransactionsByAccountDto },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<TransactionModel> {
    return await this.executeCommand({ name: CommandName.GET_TRANSACTION, params: { id } });
  }

  @Get()
  async getAll(): Promise<TransactionModel[]> {
    return await this.executeCommand({ name: CommandName.GET_TRANSACTIONS, params: {} });
  }
}
