import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
// import { BankUsersService } from '../bankUsers/bank-users.service';
// import { AccountsService } from '../accounts/accounts.service';
// import { TransactionsService } from '../transactions/transactions.service';
// import { UsersService } from '../users/users.service';

import { BankInterface } from './interfaces/bank.interface';
// import { AccountInterface } from '../accounts/interfaces/account.interface';
// import { UserInterface } from '../users/interfaces/user.interface';
// import { TransactionInterface } from '../transactions/interfaces/transaction.interface';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Injectable()
export class BanksService {
  private banks: Map<string, BankInterface> = new Map();

  constructor(
    private readonly helpersService: HelpersService, // private readonly currentUsersOfBanksService: BankUsersService, // private readonly accountsService: AccountsService, // private readonly transactionsService: TransactionsService, // private readonly usersService: UsersService,
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

  // async getAllUsersByIdBank(id: string): Promise<Array<UserInterface>> {
  //   const usersId = await this.currentUsersOfBanksService.getUsersByIdBank(id);
  //
  //   const usersPromise = usersId.map((idUser) => {
  //     return this.usersService.getById(idUser);
  //   });
  //
  //   return await Promise.all(usersPromise);
  // }
  //
  // async getAllAccountsByIdUser(
  //   idBank: string,
  //   idUser: string,
  // ): Promise<Array<AccountInterface>> {
  //   return await this.accountsService.getAllByIdBankAndIdUser(idBank, idUser);
  // }
  //
  // async getAllTransactionByIdAccount(
  //   id: string,
  // ): Promise<Array<TransactionInterface>> {
  //   return await this.transactionsService.getByIdAccount(id);
  // }

  async get(): Promise<Map<string, BankInterface>> {
    return this.banks;
  }
}
