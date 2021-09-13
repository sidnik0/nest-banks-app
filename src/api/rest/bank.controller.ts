import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BaseController } from './base.controller';
import { BankModel } from '../../model/interface/bank.model';
import { UserModel } from '../../model/interface/user.model';
import { CommandName } from '../../types/command-name.type';
import { CreateBankDto } from './rest-dto/create-bank.dto';
import { UpdateBankDto } from './rest-dto/update-bank.dto';

@Controller('banks')
export class BankController extends BaseController {
  @Post()
  async create(@Body() createBankDto: CreateBankDto): Promise<void> {
    await this.executeCommand({ name: CommandName.CREATE_BANK, params: createBankDto });
  }

  @Get(':id/users')
  async getAllUsers(@Param('id') id: string): Promise<UserModel[]> {
    return await this.executeCommand({ name: CommandName.GET_ALL_BANK_USERS, params: { id } });
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<BankModel> {
    return await this.executeCommand({ name: CommandName.GET_BANK, params: { id } });
  }

  @Get()
  async getAll(): Promise<BankModel[]> {
    return await this.executeCommand({ name: CommandName.GET_BANKS, params: {} });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_BANK, params: { id, ...updateBankDto } });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.executeCommand({ name: CommandName.DELETE_BANK, params: { id } });
  }
}
