import { Injectable } from '@nestjs/common';
import { RIdHelper } from '../../common/helper/r-id.helper';
import { AccountsService } from '../accounts/accounts.service';
import { UsersService } from '../users/users.service';
import { BanksService } from '../banks/banks.service';

import { BankUserInterface } from './interfaces/bank-user.interface';
// import { AccountInterface } from '../accounts/interfaces/account.interface';
import { UserInterface } from '../users/interfaces/user.interface';
import { BankInterface } from '../banks/interfaces/bank.interface';

import { CreateBankUserDto } from './dto/create-bank-user.dto';

@Injectable()
export class BankUsersService {
  private bankUsers: Map<string, BankUserInterface> = new Map();

  constructor(
    private readonly helpersService: RIdHelper,
    private readonly accountsService: AccountsService,
    private readonly usersService: UsersService,
    private readonly banksService: BanksService,
  ) {}

  // async createWithAccount(
  //   createBankUserDto: CreateBankUserDto,
  // ): Promise<AccountInterface> {
  //   const bankUsersPromise = this.create(createBankUserDto);
  //   const accountPromise = this.accountsService.create(createBankUserDto);
  //
  //   const [bankUser, account] = await Promise.all([
  //     bankUsersPromise,
  //     accountPromise,
  //   ]);
  //
  //   return account;
  // }

  // private async create(
  //   createBankUserDto: CreateBankUserDto,
  // ): Promise<BankUserInterface> {
  //   const id = this.helpersService.createId();
  //
  //   this.bankUsers.set(id, {
  //     id,
  //     idUser: createBankUserDto.idUser,
  //     idBank: createBankUserDto.idBank,
  //   });
  //
  //   return this.bankUsers.get(id);
  // }

  async getBanksByIdUser(idUser: string): Promise<Array<BankInterface>> {
    const banksPromise = [];

    for (const obj of this.bankUsers.values()) {
      if (obj.idUser === idUser) {
        banksPromise.push(this.banksService.getById(obj.idBank));
      }
    }

    const banks = await Promise.all(banksPromise);

    return banks || [];
  }

  async getUsersByIdBank(idBank: string): Promise<Array<UserInterface>> {
    const usersPromise = [];

    for (const obj of this.bankUsers.values()) {
      if (obj.idBank === idBank) {
        usersPromise.push(this.usersService.getById(obj.idUser));
      }
    }

    const users = await Promise.all(usersPromise);

    return users || [];
  }

  async deleteById(id: string): Promise<boolean> {
    return this.bankUsers.delete(id);
  }
}
