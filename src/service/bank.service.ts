import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IBankService } from './interface/bank.service';
import { IBankRepository } from '../repository/interface/bank.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IUserRepository } from '../repository/interface/user.repository';
import { IRateRepository } from '../repository/interface/rate.repository';
import { BankModel } from '../model/interface/bank.model';
import { UserModel } from '../model/interface/user.model';
import { RateModel } from '../model/interface/rate.model';
import { ExistsException } from '../common/exception/exists.exception';

@Injectable()
export class BankService extends BaseService<BankModel> implements IBankService {
  constructor(
    protected readonly repository: IBankRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly userRepository: IUserRepository,
    private readonly rateRepository: IRateRepository,
  ) {
    super(repository);
  }

  async create(model: BankModel & RateModel): Promise<BankModel> {
    const { name, commissionForEntity, commissionForIndividual, rubEur, rubUsd, usdEur } = model;

    const checkBank = await this.repository.checkName(name);

    if (checkBank) {
      throw new ExistsException(`Bank with name ${name} exists`);
    }

    const bank = await this.repository.create({
      name,
      commissionForEntity: commissionForEntity || 0,
      commissionForIndividual: commissionForIndividual || 0,
    });

    await this.rateRepository.create({
      bankId: bank.id,
      rubEur: rubEur || 1,
      rubUsd: rubUsd || 1,
      usdEur: usdEur || 1,
      bank,
    });

    return bank;
  }

  async getAllUsers(id: string): Promise<UserModel[]> {
    const accounts = await this.accountRepository.getAllByBank(id);

    const usersPromise = accounts.map((account) => {
      return this.userRepository.get(account.userId);
    });

    return await Promise.all(usersPromise);
  }
}
