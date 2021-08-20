import { Injectable } from '@nestjs/common';
import { RIdHelper } from '../../common/helper/r-id.helper';
// import { BankUsersService } from '../bankUsers/bank-users.service';
// import { AccountsService } from '../accounts/accounts.service';
// import { TransactionsService } from '../transactions/transactions.service';
// import { UsersService } from '../users/users.service';

import { BankInterface } from './interfaces/bank.interface';
// import { AccountInterface } from '../accounts/interface/account.interface';
// import { UserInterface } from '../users/interface/user.interface';
// import { TransactionInterface } from '../transactions/interface/transaction.interface';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
  private banks: Map<string, BankInterface> = new Map();

  constructor(
    private readonly helpersService: RIdHelper, // private readonly currentUsersOfBanksService: BankUsersService, // private readonly accountsService: AccountsService, // private readonly transactionsService: TransactionsService, // private readonly usersService: UsersService,
  ) {}

  async create(createBankDto: CreateBankDto): Promise<BankInterface> {
    const id = this.helpersService.createId();

    this.banks.set(id, { ...createBankDto, id });

    return this.banks.get(id);
  }

  async getById(id: string): Promise<BankInterface> {
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

  async get(): Promise<Map<string, BankInterface>> {
    return this.banks;
  }
}
