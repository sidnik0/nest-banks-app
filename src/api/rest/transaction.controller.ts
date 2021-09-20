import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { CommandName } from '../../types/command-name.type';
import { TransactionModel } from '../../model/interface/transaction.model';
import { CreateTransactionDto } from './rest-dto/create-transaction.dto';
import { GetAllTransactionsByAccountDto } from './rest-dto/get-all-transactions-by-account.dto';
import { IdDto } from './rest-dto/id.dto';

@Controller('transactions')
export class TransactionController extends BaseController {
  @Post()
  @ApiOperation({ summary: 'Create transaction', description: 'Create transaction' })
  @ApiBody({ type: CreateTransactionDto })
  async create(@Body() createTransactionDto: CreateTransactionDto): Promise<void> {
    await this.executeCommand({ name: CommandName.TRANSACTION_CREATE, params: createTransactionDto });
  }

  @Get('account/:id')
  @ApiOperation({ summary: 'Get transactions by account id', description: 'Get transactions by account id' })
  @ApiParam({ name: 'Account id' })
  @ApiQuery({ type: GetAllTransactionsByAccountDto })
  @ApiResponse({ type: [TransactionModel], status: 200 })
  async getAllByAccount(
    @Param() idDto: IdDto,
    @Query() getAllTransactionsByAccountDto: GetAllTransactionsByAccountDto,
  ): Promise<TransactionModel[]> {
    return await this.executeCommand({
      name: CommandName.TRANSACTION_GET_ALL_BY_ACCOUNT,
      params: { id: idDto.id, ...getAllTransactionsByAccountDto },
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by id', description: 'Get transaction by id' })
  @ApiParam({ name: 'Transaction id' })
  @ApiResponse({ type: TransactionModel, status: 200 })
  async get(@Param() idDto: IdDto): Promise<TransactionModel> {
    return await this.executeCommand({ name: CommandName.TRANSACTION_GET, params: { id: idDto } });
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions', description: 'Get all transactions' })
  @ApiResponse({ type: [TransactionModel], status: 200 })
  async getAll(): Promise<TransactionModel[]> {
    return await this.executeCommand({ name: CommandName.TRANSACTION_GET_ALL, params: {} });
  }
}
