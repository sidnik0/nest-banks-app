import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IBankService } from './interface/bank.service';
import { IBankRepository } from '../repository/interface/bank.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IUserRepository } from '../repository/interface/user.repository';
import { BankModel } from '../model/interface/bank.model';
import { UserModel } from '../model/interface/user.model';
import { ExistsException } from '../common/exception/exists.exception';

@Injectable()
export class BankService extends BaseService<BankModel> implements IBankService {
  constructor(
    protected readonly repository: IBankRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly userRepository: IUserRepository,
  ) {
    super(repository);
  }

  async create(model: BankModel): Promise<BankModel> {
    const checkBank = await this.repository.checkName(model.name);

    if (checkBank) {
      throw new ExistsException(`Bank with name ${model.name} exists`);
    }

    return await this.repository.create(model);
  }

  async getAllUsers(id: string): Promise<UserModel[]> {
    const accounts = await this.accountRepository.getAllByBank(id);

    const usersPromise = accounts.map((account) => {
      return this.userRepository.get(account.userId);
    });

    return await Promise.all(usersPromise);
  }
}
