import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { UserModel } from '../../model/interface/user.model';
import { BankModel } from '../../model/interface/bank.model';
import { CommandName } from '../../types/command-name.type';
import { CreateUserDto } from './rest-dto/create-user.dto';
import { UpdateUserDto } from './rest-dto/update-user.dto';
import { IdDto } from './rest-dto/id.dto';

@Controller('users')
export class UserController extends BaseController {
  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.executeCommand({ name: CommandName.USER_CREATE, params: createUserDto });
  }

  @Get(':id/banks')
  @ApiOperation({ summary: 'Get user banks', description: 'Get user banks' })
  @ApiParam({ name: 'User id' })
  @ApiResponse({ type: [BankModel], status: 200 })
  async getAllBanks(@Param() idDto: IdDto): Promise<BankModel[]> {
    return await this.executeCommand({ name: CommandName.USER_GET_ALL_BANKS, params: { id: idDto.id } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id', description: 'Get user by id' })
  @ApiParam({ name: 'User id' })
  @ApiResponse({ type: UserModel, status: 200 })
  async get(@Param() idDto: IdDto): Promise<UserModel> {
    return await this.executeCommand({ name: CommandName.USER_GET, params: { id: idDto.id } });
  }

  @Get()
  @ApiOperation({ summary: 'Get all users', description: 'Get all users' })
  @ApiResponse({ type: [UserModel], status: 200 })
  async getAll(): Promise<UserModel[]> {
    return await this.executeCommand({ name: CommandName.USER_GET_ALL, params: {} });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by id', description: 'Update user by id' })
  @ApiParam({ name: 'User id' })
  @ApiBody({ type: UpdateUserDto })
  async update(@Param() idDto: IdDto, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_USER, params: { id: idDto.id, ...updateUserDto } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id', description: 'Delete user by id' })
  @ApiParam({ name: 'User id' })
  async delete(@Param() idDto: IdDto): Promise<void> {
    await this.executeCommand({ name: CommandName.USER_DELETE, params: { id: idDto.id } });
  }
}
