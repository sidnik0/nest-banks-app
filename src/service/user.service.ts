import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { UserRepository } from '../repository/interface/user.repository';
import { UserModel } from '../model/interface/user.model';
import { BankModel } from 'src/model/interface/bank.model';
import { AccountRepository } from 'src/repository/interface/account.repository';
import { BankRepository } from 'src/repository/interface/bank.repository';

@Injectable()
export class UserService extends BaseService<UserModel> {
  constructor(
    protected readonly repository: UserRepository,
    private readonly accountRepository: AccountRepository,
    private readonly bankRepository: BankRepository,
  ) {
    super(repository);
  }

  async getAllBanks(id: string): Promise<BankModel[]> {
    const accounts = await this.accountRepository.getAllByBank(id);

    const banksPromise = accounts.map((account) => {
      return this.bankRepository.get(account.bankId);
    })

    return await Promise.all(banksPromise)
  }
}
