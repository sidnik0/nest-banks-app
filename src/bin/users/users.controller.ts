import { Controller, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

import { UserInterface } from './interfaces/user.interface';
// import { AccountInterface } from '../accounts/interfaces/account.interface';
// import { BankInterface } from '../banks/interfaces/bank.interface';
// import { TransactionInterface } from '../transactions/interfaces/transaction.interface';
// import { AllTransactionInterface } from '../transactions/interfaces/all-transaction.interface';

import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateBankUserDto } from '../bankUsers/dto/create-bank-user.dto';
// import { CreateAccountDto } from '../accounts/dto/create-account.dto';
// import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserInterface> {
    console.log(`Get user by id: ${id}`);

    const user = this.usersService.getById(id);

    return user || null;
  }

  @Get()
  async get(): Promise<Map<string, UserInterface>> {
    console.log(`Get all users`);

    const users = await this.usersService.get();

    return users.size ? users : null;
  }

  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    console.log(`Update user by id: ${id}`);

    return this.usersService.updateById(id, updateUserDto);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<boolean> {
    console.log(`Delete user by id: ${id}`);

    return this.usersService.deleteById(id);
  }
  //
  // @Post(':id/registration')
  // async registrationUserOfBank(
  //   @Param('id') id: string,
  //   @Body() createCurrentUserOfBankDto: CreateBankUserDto,
  // ): Promise<AccountInterface> {
  //   console.log(`Registration user ${id} in the bank`);
  //
  //   return await this.usersService.bankRegistration(createCurrentUserOfBankDto);
  // }
  //
  // @Get(':id/banks')
  // async getBanks(@Param('id') id: string): Promise<Array<BankInterface>> {
  //   console.log(`Get banks by user id: ${id}`);
  //
  //   const banks = await this.usersService.getAllBanksByIdUser(id);
  //
  //   return banks.length ? banks : null;
  // }
  //
  // @Post(':id/banks/:idBank/accounts')
  // async createAccount(
  //   @Param('id') id: string,
  //   @Param('idBank') idBank: string,
  //   @Body() createAccountDto: CreateAccountDto,
  // ): Promise<AccountInterface> {
  //   console.log(`Create account by user ${id} and bank ${idBank}`);
  //
  //   return await this.usersService.createAccount(createAccountDto);
  // }
  //
  // @Get(':id/banks/:idBank/accounts')
  // async getAccounts(
  //   @Param('id') id: string,
  //   @Param('idBank') idBank: string,
  // ): Promise<Array<AccountInterface>> {
  //   console.log(`Get account by user ${id} and bank ${idBank}`);
  //
  //   const accounts = await this.usersService.getAllAccountsByIdUserAndIdBank(
  //     id,
  //     idBank,
  //   );
  //
  //   return accounts.length ? accounts : null;
  // }
  //
  // @Get(':id/banks/:idBank/accounts/:idAccount')
  // async getAccountById(
  //   @Param('idAccount') idAccount: string,
  // ): Promise<AccountInterface> {
  //   console.log(`Get account by idAccount: ${idAccount}`);
  //
  //   return this.usersService.getAccountById(idAccount);
  // }
  //
  // @Post(':id/banks/:idBank/accounts/:idAccount/transactions')
  // async createTransaction(
  //   @Body() createTransactionDto: CreateTransactionDto,
  // ): Promise<TransactionInterface> {
  //   console.log(`Create transaction`);
  //
  //   return await this.usersService.transactionRequest(createTransactionDto);
  // }
  //
  // @Get(':id/banks/:idBank/accounts/:idAccount/transactions')
  // async getTransactions(
  //   @Param('idAccount') idAccount: string,
  // ): Promise<AllTransactionInterface> {
  //   console.log(`Get transactions by idAccount: ${idAccount}`);
  //
  //   return await this.usersService.getAllTransactionsByIdAccount(idAccount);
  // }
  //
  // @Post(':id/banks/:idBank/accounts/:idAccount/transactions/:idTransaction')
  // async getTransactionById(
  //   @Param('idTransaction') idTransaction: string,
  // ): Promise<TransactionInterface> {
  //   console.log(`Get transactions by id: ${idTransaction}`);
  //
  //   return await this.usersService.getTransactionById(idTransaction);
  // }
}
