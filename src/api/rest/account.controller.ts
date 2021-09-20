import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { BaseController } from './base.controller';
import { AccountModel } from '../../model/interface/account.model';
import { CommandName } from '../../types/command-name.type';
import { CreateAccountDto } from './rest-dto/create-account.dto';
import { GetAllAccountsByQueryDto } from './rest-dto/get-all-accounts-by-query.dto';
import { UpdateAccountDto } from './rest-dto/update-account.dto';
import { IdDto } from './rest-dto/id.dto';

@Controller('accounts')
export class AccountController extends BaseController {
  @Post()
  @ApiOperation({ summary: 'Create account', description: 'Create account' })
  @ApiBody({ type: CreateAccountDto })
  async create(@Body() createAccountDto: CreateAccountDto): Promise<void> {
    await this.executeCommand({ name: CommandName.CREATE_ACCOUNT, params: createAccountDto });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get account by id', description: 'Get account by id' })
  @ApiParam({ name: 'Account id' })
  @ApiResponse({ type: AccountModel, status: 200 })
  async get(@Param() idDto: IdDto): Promise<AccountModel> {
    return await this.executeCommand({ name: CommandName.GET_ACCOUNT, params: { id: idDto.id } });
  }

  @Get()
  @ApiOperation({ summary: 'Get all accounts', description: 'Get all accounts' })
  @ApiQuery({ type: GetAllAccountsByQueryDto })
  @ApiResponse({ type: [AccountModel], status: 200 })
  async getAll(@Query() getAllAccountByQueryDto: GetAllAccountsByQueryDto): Promise<AccountModel[]> {
    const { bankId, userId } = getAllAccountByQueryDto;

    if (bankId && userId) {
      return await this.executeCommand({
        name: CommandName.GET_ALL_ACCOUNTS_BY_USER_AND_BANK,
        params: { bankId, userId },
      });
    } else if (bankId && !userId) {
      return await this.executeCommand({
        name: CommandName.GET_ALL_ACCOUNTS_BY_BANK,
        params: { id: bankId },
      });
    } else if (!bankId && userId) {
      return await this.executeCommand({
        name: CommandName.GET_ALL_ACCOUNTS_BY_USER,
        params: { id: userId },
      });
    } else {
      return await this.executeCommand({
        name: CommandName.GET_ACCOUNTS,
        params: {},
      });
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update account by id', description: 'Update account by id' })
  @ApiParam({ name: 'Account id' })
  @ApiBody({ type: UpdateAccountDto })
  async updateBalance(@Param() idDto: IdDto, @Body() updateAccountDto: UpdateAccountDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_ACCOUNT, params: { id: idDto.id, ...updateAccountDto } });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete account by id', description: 'Delete account by id' })
  @ApiParam({ name: 'Account id' })
  async delete(@Param() idDto: IdDto): Promise<void> {
    await this.executeCommand({ name: CommandName.DELETE_ACCOUNT, params: { id: idDto.id } });
  }
}
