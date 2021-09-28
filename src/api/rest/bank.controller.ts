import { Controller, Get, Post, Put, Delete, Param, Body, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseController } from './base.controller';
import { BankModel } from '../../model/interface/bank.model';
import { UserModel } from '../../model/interface/user.model';
import { CommandName } from '../../types/command-name.type';
import { CreateBankDto } from './rest-dto/create-bank.dto';
import { UpdateBankDto } from './rest-dto/update-bank.dto';
import { IdDto } from './rest-dto/id.dto';

@ApiTags('banks')
@Controller('banks')
export class BankController extends BaseController {
  @Post()
  @ApiOperation({ summary: 'Create bank', description: 'Create bank' })
  @ApiBody({ type: CreateBankDto })
  async create(@Body() createBankDto: CreateBankDto, @Res({ passthrough: true }) res: Response): Promise<void> {
    const bank = await this.executeCommand({ name: CommandName.BANK_CREATE, params: createBankDto });

    res.set('Location', bank.id);
  }

  @Get(':id/users')
  @ApiOperation({ summary: 'Get bank users', description: 'Get bank users' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: [UserModel], status: 200 })
  async getAllUsers(@Param() idDto: IdDto): Promise<UserModel[]> {
    return await this.executeCommand({ name: CommandName.BANK_GET_ALL_USERS, params: { id: idDto.id } });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get bank by id', description: 'Get bank by id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ type: BankModel, status: 200 })
  async get(@Param() idDto: IdDto): Promise<BankModel> {
    return await this.executeCommand({ name: CommandName.BANK_GET, params: { id: idDto.id } });
  }

  @Get()
  @ApiOperation({ summary: 'Get all banks', description: 'Get all banks' })
  @ApiResponse({ type: [BankModel], status: 200 })
  async getAll(): Promise<BankModel[]> {
    return await this.executeCommand({ name: CommandName.BANK_GET_ALL, params: {} });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bank by id', description: 'Update bank by id' })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: UpdateBankDto })
  async update(@Param() idDto: IdDto, @Body() updateBankDto: UpdateBankDto): Promise<void> {
    await this.executeCommand({ name: CommandName.BANK_UPDATE, params: { id: idDto.id, ...updateBankDto } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bank by id', description: 'Delete bank by id' })
  @ApiParam({ name: 'id' })
  async delete(@Param() idDto: IdDto): Promise<void> {
    await this.executeCommand({ name: CommandName.BANK_DELETE, params: { id: idDto.id } });
  }
}
