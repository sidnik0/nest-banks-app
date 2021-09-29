import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IUserService, IUserCreationWithAccountCreation } from './interface/user.service';
import { IUserRepository } from '../repository/interface/user.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IBankRepository } from '../repository/interface/bank.repository';
import { IRateRepository } from '../repository/interface/rate.repository';
import { UserModel } from '../model/interface/user.model';
import { BankModel } from '../model/interface/bank.model';
import { AccountModel } from '../model/interface/account.model';
import { RateModel } from '../model/interface/rate.model';
import { FaceType } from '../types/face.type';
import { ExistsException } from '../common/exception/exists.exception';
import { HttpRateService } from '../common/util/http/http-rate.service';

@Injectable()
export class UserService extends BaseService<UserModel> implements IUserService {
  constructor(
    protected readonly repository: IUserRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly bankRepository: IBankRepository,
    private readonly rateRepository: IRateRepository,
    private readonly httpRateService: HttpRateService,
  ) {
    super(repository);
  }

  async create(model: UserModel): Promise<UserModel> {
    if (model.face === FaceType.ENTITY) {
      const entityUser = await this.repository.findEntityUserByName(model.name);

      if (!!entityUser) {
        throw new ExistsException(`Entity(user) with name ${model.name} exists`);
      }
    }

    return await this.repository.create(model);
  }

  async getAllBanks(id: string): Promise<BankModel[]> {
    const accounts = await this.accountRepository.getAllByUser(id);

    const banksPromise = accounts.map((account) => {
      return this.bankRepository.get(account.bankId);
    });

    return await Promise.all(banksPromise);
  }

  async createUserWithAccountCreation({
    user: userModel,
    bank: bankModel,
    rate: rateModel,
    account: accountModel,
  }: IUserCreationWithAccountCreation): Promise<{ user: UserModel; bank: BankModel; account: AccountModel }> {
    const user = await this.create(userModel);

    const bank = await this.createBank(bankModel, rateModel);

    const account = await this.createAccount(accountModel, user, bank);

    return { user, bank, account };
  }

  private async createBank(model: BankModel, rate: RateModel): Promise<BankModel> {
    const existingBank = await this.bankRepository.findBankByName(model.name);

    if (!!existingBank) {
      return existingBank;
    }

    const bankPromise = this.bankRepository.create({
      name: model.name,
      commissionForEntity: 0,
      commissionForIndividual: 0,
    });

    const ratesPromise = this.httpRateService.getRates();

    const [newBank, rates] = await Promise.all([bankPromise, ratesPromise]);

    await this.rateRepository.create({
      bankId: newBank.id,
      bynEur: rate.bynUsd || rates.bynEur,
      bynUsd: rate.bynEur || rates.bynUsd,
      usdEur: rate.usdEur || rates.usdEur,
      bank: newBank,
    });

    return newBank;
  }

  private async createAccount(
    model: Pick<AccountModel, 'currency' | 'balance'>,
    user: UserModel,
    bank: BankModel,
  ): Promise<AccountModel> {
    const data = model.balance ? model : { ...model, balance: 0 };

    return await this.accountRepository.create({
      ...data,
      userId: user.id,
      user,
      bankId: bank.id,
      bank,
    } as AccountModel);
  }
}
