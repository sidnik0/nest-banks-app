import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IAccountService } from './interface/account.service';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IUserRepository } from '../repository/interface/user.repository';
import { IBankRepository } from '../repository/interface/bank.repository';
import { AccountModel } from '../model/interface/account.model';
import { AccountCreatorException } from '../common/exception/account-creator.exception';
import { OperationType } from '../types/operation.type';

@Injectable()
export class AccountService extends BaseService<AccountModel> implements IAccountService {
  constructor(
    protected readonly repository: IAccountRepository,
    private readonly userRepository: IUserRepository,
    private readonly bankRepository: IBankRepository,
  ) {
    super(repository);
  }

  async create(model: AccountModel): Promise<AccountModel> {
    const userPromise = this.userRepository.get(model.userId);
    const bankPromise = this.bankRepository.get(model.bankId);

    const [user, bank] = await Promise.all([userPromise, bankPromise]);

    if (!user || !bank) {
      throw new AccountCreatorException(`Not found user:${model.userId} or bank:${model.bankId}`);
    }

    const data = model.balance ? model : { ...model, balance: 0 };

    return await this.repository.create({ ...data, user, bank } as AccountModel);
  }

  update(): never {
    throw Error('Prohibited operation');
  }

  async updateBalance(id: string, updateModel: { amount: number; operation: OperationType }): Promise<AccountModel> {
    const data = await this.repository.get(id);

    data.balance =
      Math.round(
        (data.balance + (updateModel.operation === 'replenishment' ? updateModel.amount : -updateModel.amount)) * 100,
      ) / 100;

    return await this.repository.update(data);
  }

  async getAllByUser(id: string): Promise<AccountModel[]> {
    return this.repository.getAllByUser(id);
  }

  async getAllByBank(id: string): Promise<AccountModel[]> {
    return this.repository.getAllByBank(id);
  }

  async getAllByUserAndBank(userId: string, bankId: string): Promise<AccountModel[]> {
    return await this.repository.getAllByUserAndBank(userId, bankId);
  }
}
