import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { AccountRepository } from '../repository/interface/account.repository';
import { UserRepository } from 'src/repository/interface/user.repository';
import { BankRepository } from 'src/repository/interface/bank.repository';
import { AccountModel } from '../model/interface/account.model';
import { OperationType } from '../types/operation.type';
import { AccountCreatorException } from 'src/common/exseption/account-creator-exception';

@Injectable()
export class AccountService extends BaseService<AccountModel> {
  constructor(
    protected readonly repository: AccountRepository,
    private readonly userRepository: UserRepository,
    private readonly bankRepository: BankRepository
  ) {
    super(repository);
  }

  async create(model: AccountModel): Promise<AccountModel> {
    const userPromise = this.userRepository.get(model.userId);
    const bankPromise = this.bankRepository.get(model.bankId);

    const [user, bank] = await Promise.all([userPromise, bankPromise]);

    if (!user || !bank) throw new AccountCreatorException(`Not found user:${model.userId} or bank:${model.bankId}`)

    return await this.repository.create(model);
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
