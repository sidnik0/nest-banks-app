import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { BankModel } from '../../model/interface/bank.model';
import { UserModel } from '../../model/interface/user.model';
import { CommandName } from '../../types/command-name.type';
import { CreateBankDto } from './rest-dto/create-bank.dto';
import { UpdateBankDto } from './rest-dto/update-bank.dto';
import { IdDto } from './rest-dto/id.dto';

@Controller('banks')
export class BankController extends BaseController {
  @Post()
  @ApiOperation({ summary: 'Create bank', description: 'Create bank' })
  @ApiBody({ type: CreateBankDto })
  async create(@Body() createBankDto: CreateBankDto): Promise<void> {
    await this.executeCommand({ name: CommandName.CREATE_BANK, params: createBankDto });
  }

  @Get(':id/users')
  @ApiOperation({ summary: 'Get bank users', description: 'Get bank users' })
  @ApiParam({ name: 'Bank id' })
  @ApiResponse({ type: [UserModel], status: 200 })
  async getAllUsers(@Param() idDto: IdDto): Promise<UserModel[]> {
    return await this.executeCommand({ name: CommandName.GET_ALL_BANK_USERS, params: { id: idDto.id } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bank by id', description: 'Get bank by id' })
  @ApiParam({ name: 'Bank id' })
  @ApiResponse({ type: BankModel, status: 200 })
  async get(@Param() idDto: IdDto): Promise<BankModel> {
    return await this.executeCommand({ name: CommandName.GET_BANK, params: { id: idDto.id } });
  }

  @Get()
  @ApiOperation({ summary: 'Get all banks', description: 'Get all banks' })
  @ApiResponse({ type: [BankModel], status: 200 })
  async getAll(): Promise<BankModel[]> {
    return await this.executeCommand({ name: CommandName.GET_BANKS, params: {} });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bank by id', description: 'Update bank by id' })
  @ApiParam({ name: 'Bank id' })
  @ApiBody({ type: UpdateBankDto })
  async update(@Param() idDto: IdDto, @Body() updateBankDto: UpdateBankDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_BANK, params: { id: idDto.id, ...updateBankDto } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bank by id', description: 'Delete bank by id' })
  @ApiParam({ name: 'Bank id' })
  async delete(@Param() idDto: IdDto): Promise<void> {
    await this.executeCommand({ name: CommandName.DELETE_BANK, params: { id: idDto.id } });
  }
}
