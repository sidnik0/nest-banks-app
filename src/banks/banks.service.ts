import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { CurrentUsersOfBanksService } from '../currentUsersOfBanks/current-users-of-banks.service';
import { AccountsService } from '../accounts/accounts.service';
import { TransactionsService } from '../transactions/transactions.service';

import { BankInterface } from './interfaces/bank.interface';
import { AccountInterface } from '../accounts/interfaces/account.interface';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { AllTransactionInterface } from '../transactions/interfaces/all-transaction.interface';

@Injectable()
export class BanksService {
  private banks: Map<string, BankInterface> = new Map();

  constructor(
    private readonly helpersService: HelpersService,
    private readonly currentUsersOfBanksService: CurrentUsersOfBanksService,
    private readonly accountsService: AccountsService,
    private readonly transactionsService: TransactionsService,
  ) {}

  async create(createBankDto: CreateBankDto): Promise<BankInterface> {
    const id = this.helpersService.createId();

    this.banks.set(id, { ...createBankDto, id });

    return this.banks.get(id);
  }

  async getById(id: string): Promise<BankInterface | undefined> {
    return this.banks.get(id);
  }

  async updateById(
    id: string,
    updateBankDto: UpdateBankDto,
  ): Promise<BankInterface> {
    const oldValue = this.banks.get(id);

    this.banks.set(id, { ...oldValue, ...updateBankDto });

    return this.banks.get(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.banks.delete(id);
  }

  async getAllUsersByIdBank(id: string): Promise<Array<string>> {
    return this.currentUsersOfBanksService.getUsersByIdBank(id);
  }

  async getAllAccountsByIdUser(id: string): Promise<Array<AccountInterface>> {
    return this.accountsService.getAllByIdUser(id);
  }

  async getAllTransactionByIdAccount(
    id: string,
  ): Promise<AllTransactionInterface> {
    return this.transactionsService.getByIdAccount(id);
  }

  async get(): Promise<Map<string, BankInterface>> {
    return this.banks;
  }
}
