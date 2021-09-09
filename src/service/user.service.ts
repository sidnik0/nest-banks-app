import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IUserService } from './interface/user.service';
import { IUserRepository } from '../repository/interface/user.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IBankRepository } from '../repository/interface/bank.repository';
import { UserModel } from '../model/interface/user.model';
import { BankModel } from '../model/interface/bank.model';

@Injectable()
export class UserService
  extends BaseService<UserModel>
  implements IUserService
{
  constructor(
    protected readonly repository: IUserRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly bankRepository: IBankRepository,
  ) {
    super(repository);
  }

  async getAllBanks(id: string): Promise<BankModel[]> {
    const accounts = await this.accountRepository.getAllByBank(id);

    const banksPromise = accounts.map((account) => {
      return this.bankRepository.get(account.bankId);
    });

    return await Promise.all(banksPromise);
  }
}
