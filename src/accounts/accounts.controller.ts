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
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<void> {
    this.accountsService.create(createAccountDto);

    console.log(`Create account`);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<void> {
    this.accountsService.getById(id);

    console.log(`Get account by id: ${id}`);
  }

  @Get()
  async get(): Promise<void> {
    this.accountsService.get();

    console.log(`Get all accounts`);
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    this.accountsService.update(id, updateAccountDto);

    console.log(`Update account by id: ${id}`);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    this.accountsService.delete(id);

    console.log(`Delete account by id: ${id}`);
  }
}
