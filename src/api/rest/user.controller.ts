import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BaseController } from './base.controller';
import { UserModel } from '../../model/interface/user.model';
import { BankModel } from '../../model/interface/bank.model';
import { CommandName } from '../../types/command-name.type';
import { CreateUserDto } from './rest-dto/create-user.dto';
import { UpdateUserDto } from './rest-dto/update-user.dto';

@Controller('users')
export class UserController extends BaseController {
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.executeCommand({ name: CommandName.CREATE_USER, params: createUserDto });
  }

  @Get(':id/banks')
  async getAllBanks(@Param('id') id: string): Promise<BankModel[]> {
    return await this.executeCommand({ name: CommandName.GET_ALL_USER_BANKS, params: { id } });
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<UserModel> {
    return await this.executeCommand({ name: CommandName.GET_USER, params: { id } });
  }

  @Get()
  async getAll(): Promise<UserModel[]> {
    return await this.executeCommand({ name: CommandName.GET_USERS, params: {} });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_USER, params: { id, ...updateUserDto } });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.executeCommand({ name: CommandName.DELETE_USER, params: { id } });
  }
}
