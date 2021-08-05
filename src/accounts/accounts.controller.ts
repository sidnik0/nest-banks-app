import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountInterface } from './interfaces/acoount.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountInterface> {
    console.log(`Create account`);

    return this.accountsService.create(createAccountDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<AccountInterface> {
    console.log(`Get account by id: ${id}`);

    const account = this.accountsService.getById(id);

    return account || null;
  }

  @Get()
  async get(): Promise<Map<string, AccountInterface>> {
    console.log(`Get all accounts`);

    const accounts = this.accountsService.get();

    return accounts.size ? accounts : null;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<AccountInterface> {
    console.log(`Update account by id: ${id}`);

    return this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    console.log(`Delete account by id: ${id}`);

    return this.accountsService.delete(id);
  }
}
