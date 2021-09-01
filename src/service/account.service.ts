import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { AccountRepository } from '../repository/interface/account.repository';
import { AccountModel } from '../model/interface/account.model';
import { OperationType } from '../types/operation.type';

@Injectable()
export class AccountService extends BaseService<AccountModel> {
  constructor(protected readonly repository: AccountRepository) {
    super(repository);
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async updateBalance(
    id: string,
    obj: { amount: number; operation: OperationType },
  ): Promise<AccountModel> {
    const data = await this.repository.get(id);

    data.balance =
      Math.floor(
        (data.balance +
          (obj.operation === 'replenishment' ? obj.amount : -obj.amount)) *
          100,
      ) / 100;

    return await this.repository.update(data);
  }

  async getAllByUser(id: string): Promise<AccountModel[]> {
    return this.repository.getAllByUser(id);
  }

  async getAllByBank(id: string): Promise<AccountModel[]> {
    return this.repository.getAllByBank(id);
  }

  async getAllByUserAndBank(
    userId: string,
    bankId: string,
  ): Promise<AccountModel[]> {
    return await this.repository.getAllByUserAndBank(userId, bankId);
  }
}
