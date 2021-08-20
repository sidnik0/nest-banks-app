import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { BanksService } from './banks.service';

import { BankInterface } from './interfaces/bank.interface';
// import { UserInterface } from '../users/interface/user.interface';
// import { AccountInterface } from '../accounts/interface/account.interface';
// import { AllTransactionInterface } from '../transactions/interface/all-transaction.interface';

// import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  // @Post('')
  // async create(@Body() createBankDto: CreateBankDto): Promise<BankInterface> {
  //   console.log(`Create bank`);
  //
  //   return this.banksService.create(createBankDto);
  // }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<BankInterface> {
    console.log(`Get bank by id: ${id}`);

    const bank = this.banksService.getById(id);

    return bank || null;
  }

  @Get()
  async get(): Promise<Map<string, BankInterface>> {
    console.log(`Get all banks`);

    const banks = await this.banksService.get();

    return banks.size ? banks : null;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<BankInterface> {
    console.log(`Update bank by id: ${id}`);

    return this.banksService.updateById(id, updateBankDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    console.log(`Delete bank by id: ${id}`);

    return this.banksService.deleteById(id);
  }

  // @Get(':id/users')
  // async getAllUsers(@Param('id') id: string): Promise<Array<UserInterface>> {
  //   console.log(`Get all users by id bank: ${id}`);
  //
  //   const users = await this.banksService.getAllUsersByIdBank(id);
  //
  //   return users.length ? users : null;
  // }
  //
  // @Get(':id/users/:idUser/accounts')
  // async getAllAccounts(
  //   @Param('id') id: string,
  //   @Param('idUser') idUser: string,
  // ): Promise<Array<AccountInterface>> {
  //   console.log(`Get all accounts by id bank: ${id} and id user: ${idUser}`);
  //
  //   const accounts = await this.banksService.getAllAccountsByIdUser(id, idUser);
  //
  //   return accounts.length ? accounts : null;
  // }
  //
  // @Get(':id/users/:idUser/accounts/:idAccount')
  // async getAllTransactions(
  //   @Param('id') id: string,
  //   @Param('idUser') idUser: string,
  //   @Param('idAccount') idAccount: string,
  // ): Promise<AllTransactionInterface> {
  //   console.log(`Get all transactions by id account: ${idAccount}`);
  //
  //   return await this.banksService.getAllTransactionByIdAccount(idAccount);
  // }
}
