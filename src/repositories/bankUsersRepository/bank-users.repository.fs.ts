import { Injectable } from '@nestjs/common';
import { BankUsersRepository } from './bank-users.repository';
import { HelpersService } from '../../common/helpers/helpers.service';
import { BankUsersModelFs } from '../../models/bankUsersModel/bank-users.model.fs';

@Injectable()
export class BankUsersRepositoryFs implements BankUsersRepository {
  private bankUsers: Map<string, BankUsersModelFs> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(data: BankUsersModelFs): Promise<BankUsersModelFs> {
    const id = this.helpersService.createId();

    this.bankUsers.set(id, { id, ...data });

    return this.bankUsers.get(id);
  }

  async getBanksByIdUser(id: string): Promise<Array<BankUsersModelFs>> {
    const banks: Array<BankUsersModelFs> = [];

    for (const obj of this.bankUsers.values()) {
      if (obj.idUser === id) {
        banks.push(obj);
      }
    }

    return banks;
  }

  async getUsersByIdBank(id: string): Promise<Array<BankUsersModelFs>> {
    const users: Array<BankUsersModelFs> = [];

    for (const obj of this.bankUsers.values()) {
      if (obj.idBank === id) {
        users.push(obj);
      }
    }

    return users;
  }

  async get(): Promise<Array<BankUsersModelFs>> {
    const result: Array<BankUsersModelFs> = [];

    for (const obj of this.bankUsers.values()) {
      result.push(obj);
    }

    return result;
  }

  async deleteById(id: string): Promise<void> {
    this.bankUsers.delete(id);
  }
}
