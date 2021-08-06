import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { CurrentUsersOfBanksService } from '../currentUsersOfBanks/current-users-of-banks.service';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';

import { UserInterface } from './interfaces/user.interface';
import { AccountInterface } from '../accounts/interfaces/account.interface';
import { TransactionInterface } from '../transactions/interfaces/transaction.interface';
import { AllTransactionInterface } from '../transactions/interfaces/all-transaction.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { CreateCurrentUserOfBankDto } from '../currentUsersOfBanks/dto/create-current-user-of-bank.dto';
import { CreateAccountDto } from '../accounts/dto/create-account.dto';
import { CreateTransactionDto } from '../transactions/dto/create-transaction.dto';

@Injectable()
export class UsersService {
  private users: Map<string, UserInterface> = new Map();

  constructor(
    private readonly helpersService: HelpersService,
    private readonly currentUsersOfBanksService: CurrentUsersOfBanksService,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
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

  async bankRegistration(
    createCurrentUserOfBankDto: CreateCurrentUserOfBankDto,
  ): Promise<void> {
    await this.currentUsersOfBanksService.create(createCurrentUserOfBankDto);
  }

  async getAllBanksByIdUser(id: string): Promise<Array<string>> {
    return this.currentUsersOfBanksService.getBanksByIdUser(id);
  }

  async createAccount(createAccountDto: CreateAccountDto): Promise<void> {
    await this.accountsService.create(createAccountDto);
  }

  async getAccountById(id: string): Promise<AccountInterface> {
    return this.accountsService.getById(id);
  }

  async getAllAccountsByIdUser(id: string): Promise<Array<AccountInterface>> {
    return this.accountsService.getAllByIdUser(id);
  }

  async transactionRequest(
    createTransactionDto: CreateTransactionDto,
  ): Promise<void> {
    await this.transactionsService.create(createTransactionDto);
  }

  async getTransactionById(id: string): Promise<TransactionInterface> {
    return this.transactionsService.getById(id);
  }

  async getAllTransactionsByIdAccount(
    id: string,
  ): Promise<AllTransactionInterface> {
    return this.transactionsService.getByIdAccount(id);
  }

  async get(): Promise<Map<string, UserInterface>> {
    return this.users;
  }
}
