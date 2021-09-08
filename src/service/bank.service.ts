import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { BankRepository } from '../repository/interface/bank.repository';
import { BankModel } from '../model/interface/bank.model';
import { AccountRepository } from '../repository/interface/account.repository';
import { UserModel } from '../model/interface/user.model';
import { UserRepository } from '../repository/interface/user.repository';

@Injectable()
export class BankService extends BaseService<BankModel> {
  constructor(
    protected readonly repository: BankRepository,
    private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(repository);
  }

  async getAllUsers(id: string): Promise<UserModel[]> {
    const accounts = await this.accountRepository.getAllByBank(id);

    const usersPromise = accounts.map((account) => {
      return this.userRepository.get(account.userId);
    })

    return await Promise.all(usersPromise)
  }
}
