import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CurrentUsersOfBanksService } from './current-users-of-banks.service';
import { CurrentUserOfBankInterface } from './interfaces/current-user-of-bank.interface';
import { CreateCurrentUserOfBankDto } from './dto/create-current-user-of-bank.dto';

@Controller('current_users_to_banks')
export class CurrentUsersOfBanksController {
  constructor(
    private readonly currentUsersOfBanksService: CurrentUsersOfBanksService,
  ) {}

  @Post()
  async create(
    @Body() createCurrentUserOfBankDto: CreateCurrentUserOfBankDto,
  ): Promise<CurrentUserOfBankInterface> {
    console.log(`Create current user of bank`);

    return this.currentUsersOfBanksService.create(createCurrentUserOfBankDto);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<CurrentUserOfBankInterface> {
    console.log(`Get by id: ${id}`);

    const cUOB = this.currentUsersOfBanksService.getById(id);

    return cUOB || null;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    console.log(`Delete by id: ${id}`);

    return this.currentUsersOfBanksService.deleteById(id);
  }
}
