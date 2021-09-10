import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IBankService } from './interface/bank.service';
import { IBankRepository } from '../repository/interface/bank.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IUserRepository } from '../repository/interface/user.repository';
import { BankModel } from '../model/interface/bank.model';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class BankService extends BaseService<BankModel> implements IBankService {
  constructor(
    protected readonly repository: IBankRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly userRepository: IUserRepository,
  ) {
    super(repository);
  }

  async getAllUsers(id: string): Promise<UserModel[]> {
    const accounts = await this.accountRepository.getAllByBank(id);

    const usersPromise = accounts.map((account) => {
      return this.userRepository.get(account.userId);
    });

    return await Promise.all(usersPromise);
  }
}
