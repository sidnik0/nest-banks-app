import { Injectable } from '@nestjs/common';
import { AccountsRepository } from './accounts.repository';
import { HelpersService } from '../../common/helpers/helpers.service';
import { AccountsModelFs } from '../../models/accountsModel/accounts.model.fs';

@Injectable()
export class AccountsRepositoryFs implements AccountsRepository {
  private accounts: Map<string, AccountsModelFs> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(data: AccountsModelFs): Promise<AccountsModelFs> {
    const id = this.helpersService.createId();

    const balance = data.balance || 0;

    this.accounts.set(id, { ...data, balance, id });

    return this.accounts.get(id);
  }

  async getById(id: string): Promise<AccountsModelFs> {
    return this.accounts.get(id);
  }

  async getAllByIdBankAndIdUser(
    idBank: string,
    idUser: string,
  ): Promise<Array<AccountsModelFs>> {
    const result: Array<AccountsModelFs> = [];

    for (const obj of this.accounts.values()) {
      if (obj.idUser === idUser && obj.idBank === idBank) {
        result.push(obj);
      }
    }

    return result;
  }

  async getAllByIdUser(id: string): Promise<Array<AccountsModelFs>> {
    const result: Array<AccountsModelFs> = [];

    for (const obj of this.accounts.values()) {
      if (obj.idUser === id) {
        result.push(obj);
      }
    }

    return result;
  }

  async get(): Promise<Array<AccountsModelFs>> {
    const result: Array<AccountsModelFs> = [];

    for (const obj of this.accounts.values()) {
      result.push(obj);
    }

    return result;
  }

  async updateById(
    id: string,
    newData: AccountsModelFs,
  ): Promise<AccountsModelFs> {
    const oldData = this.accounts.get(id);

    if (!oldData) return null;

    this.accounts.set(id, { ...oldData, ...newData });

    return this.accounts.get(id);
  }

  async deleteById(id: string): Promise<void> {
    this.accounts.delete(id);
  }
}
