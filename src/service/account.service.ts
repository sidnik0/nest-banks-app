import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repository/interface/account.repository';
import { AccountModel } from '../model/interface/account.model';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async create(model: AccountModel): Promise<AccountModel> {
    return await this.accountRepository.create(model);
  }

  async get(id: string): Promise<AccountModel> {
    return await this.accountRepository.get(id);
  }

  async getAll(): Promise<AccountModel[]> {
    return await this.accountRepository.getAll();
  }

  async updateBalance(
    id: string,
    obj: { amount: number; boolean: boolean },
  ): Promise<AccountModel> {
    const data = await this.accountRepository.get(id);

    data.balance =
      Math.floor(
        (data.balance + (obj.boolean ? obj.amount : -obj.amount)) * 100,
      ) / 100;

    return await this.accountRepository.update(data);
  }

  async delete(id: string): Promise<boolean> {
    return await this.accountRepository.delete(id);
  }

  async getAllByUser(id: string): Promise<AccountModel[]> {
    return this.accountRepository.getAllByUser(id);
  }

  async getAllByBank(id: string): Promise<AccountModel[]> {
    return this.accountRepository.getAllByBank(id);
  }

  async getAllByUserAndBank(
    userId: string,
    bankId: string,
  ): Promise<AccountModel[]> {
    return await this.accountRepository.getAllByUserAndBank(userId, bankId);
  }
}
