import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { BaseController } from './base.controller';
import { AccountModel } from '../../model/interface/account.model';
import { CommandName } from '../../types/command-name.type';
import { CreateAccountDto } from './rest-dto/create-account.dto';
import { GetAllAccountsByQueryDto } from './rest-dto/get-all-accounts-by-query.dto';
import { UpdateAccountDto } from './rest-dto/update-account.dto';

@Controller('accounts')
export class AccountController extends BaseController {
  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<void> {
    await this.executeCommand({ name: CommandName.CREATE_ACCOUNT, params: createAccountDto });
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<AccountModel> {
    return await this.executeCommand({ name: CommandName.GET_ACCOUNT, params: { id } });
  }

  @Get()
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
  async updateBalance(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<void> {
    await this.executeCommand({ name: CommandName.UPDATE_ACCOUNT, params: { id, ...updateAccountDto } });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.executeCommand({ name: CommandName.DELETE_ACCOUNT, params: { id } });
  }
}
