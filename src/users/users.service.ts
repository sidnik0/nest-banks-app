import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
// import { BankUsersService } from '../bankUsers/bank-users.service';
// import { AccountsService } from '../accounts/accounts.service';
// import { TransactionsService } from '../transactions/transactions.service';
// import { BanksService } from '../banks/banks.service';

import { UserInterface } from './interfaces/user.interface';
// import { AccountInterface } from '../accounts/interfaces/account.interface';
// import { TransactionInterface } from '../transactions/interfaces/transaction.interface';
// import { BankInterface } from '../banks/interfaces/bank.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { CreateBankUserDto } from '../bankUsers/dto/create-bank-user.dto';
// import { CreateAccountDto } from '../accounts/dto/create-account.dto';
// import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';

@Injectable()
export class UsersService {
  private users: Map<string, UserInterface> = new Map();

  constructor(
    private readonly helpersService: HelpersService, // private readonly currentUsersOfBanksService: BankUsersService, // private readonly accountsService: AccountsService, // private readonly transactionsService: TransactionsService, // private readonly banksService: BanksService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const id = this.helpersService.createId();

    this.users.set(id, { ...createUserDto, id });

    return this.users.get(id);
  }

  async getById(id: string): Promise<UserInterface> {
    return this.users.get(id);
  }

  async updateById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    const oldValue = this.users.get(id);

    this.users.set(id, { ...oldValue, ...updateUserDto });

    return this.users.get(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // async bankRegistration(
  //   createCurrentUserOfBankDto: CreateBankUserDto,
  // ): Promise<AccountInterface> {
  //   return await this.currentUsersOfBanksService.create(
  //     createCurrentUserOfBankDto,
  //   );
  // }
  //
  // async getAllBanksByIdUser(id: string): Promise<Array<BankInterface>> {
  //   const banksId = await this.currentUsersOfBanksService.getBanksByIdUser(id);
  //
  //   const banksPromise = banksId.map((idBank) => {
  //     return this.banksService.getById(idBank);
  //   });
  //
  //   return await Promise.all(banksPromise);
  // }

  // async createAccount(
  //   createAccountDto: CreateAccountDto,
  // ): Promise<AccountInterface> {
  //   return await this.accountsService.create(createAccountDto);
  // }
  //
  // async getAccountById(id: string): Promise<AccountInterface> {
  //   return await this.accountsService.getById(id);
  // }
  //
  // async getAllAccountsByIdUser(
  //   idUser: string,
  // ): Promise<Array<AccountInterface>> {
  //   return await this.accountsService.getAllByIdUser(idUser);
  // }
  //
  // async getAllAccountsByIdUserAndIdBank(
  //   idUser: string,
  //   idBank: string,
  // ): Promise<Array<AccountInterface>> {
  //   return await this.accountsService.getAllByIdBankAndIdUser(idBank, idUser);
  // }

  // async transactionRequest(
  //   createTransactionDto: CreateTransactionDto,
  // ): Promise<TransactionInterface> {
  //   return await this.transactionsService.create(createTransactionDto);
  // }
  //
  // async getTransactionById(id: string): Promise<TransactionInterface> {
  //   return this.transactionsService.getById(id);
  // }
  //
  // async getAllTransactionsByIdAccount(
  //   id: string,
  // ): Promise<AllTransactionInterface> {
  //   return this.transactionsService.getByIdAccount(id);
  // }

  async get(): Promise<Map<string, UserInterface>> {
    return this.users;
  }
}
