import { Controller, Get, Post, Param, Body, Query, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from './base.controller';
import { CommandName } from '../../types/command-name.type';
import { TransactionModel } from '../../model/interface/transaction.model';
import { CreateTransactionDto } from './rest-dto/create-transaction.dto';
import { GetAllTransactionsByAccountDto } from './rest-dto/get-all-transactions-by-account.dto';
import { IdDto } from './rest-dto/id.dto';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController extends BaseController {
  @Post()
  @ApiOperation({ summary: 'Create transaction', description: 'Create transaction' })
  @ApiBody({ type: CreateTransactionDto })
  async create(@Body() createTransactionDto: CreateTransactionDto, @Res() res: Response): Promise<void> {
    const transaction = await this.executeCommand({
      name: CommandName.TRANSACTION_CREATE,
      params: createTransactionDto,
    });

    res.set('Location', transaction.id);
    res.end();
  }

  @Get('accounts/:id')
  @ApiOperation({ summary: 'Get transactions by account id', description: 'Get transactions by account id' })
  @ApiQuery({ type: GetAllTransactionsByAccountDto })
  @ApiParam({ name: 'id' })
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
  @ApiParam({ name: 'id' })
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
