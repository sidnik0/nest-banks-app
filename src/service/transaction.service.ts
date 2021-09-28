import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { ITransactionService } from './interface/transaction.service';
import { ITransactionRepository } from '../repository/interface/transaction.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IBankRepository } from '../repository/interface/bank.repository';
import { IUserRepository } from '../repository/interface/user.repository';
import { IRateRepository } from '../repository/interface/rate.repository';
import { TransactionModel } from '../model/interface/transaction.model';
import { AccountModel } from '../model/interface/account.model';
import { FaceType } from '../types/face.type';
import { TransactionBalanceException } from '../common/exception/transaction-balance.exception';

@Injectable()
export class TransactionService extends BaseService<TransactionModel> implements ITransactionService {
  constructor(
    protected readonly repository: ITransactionRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly bankRepository: IBankRepository,
    private readonly userRepository: IUserRepository,
    private readonly rateRepository: IRateRepository,
  ) {
    super(repository);
  }

  async createTransaction({
    fromAccountId,
    toAccountId,
    amount,
  }: Omit<TransactionModel, 'createAt'>): Promise<TransactionModel> {
    if (fromAccountId === toAccountId) {
      throw Error(`Transaction prohibited. From account = ${fromAccountId}, to account = ${toAccountId}`);
    }

    const fromAccountPromise = this.accountRepository.get(fromAccountId);
    const toAccountPromise = this.accountRepository.get(toAccountId);

    const [fromAccount, toAccount] = await Promise.all([fromAccountPromise, toAccountPromise]);

    const commissionPromise = this.getCurrenCommission(fromAccount, toAccount);
    const ratePromise = this.getCurrenRate(fromAccount, toAccount);

    const [commission, rate] = await Promise.all([commissionPromise, ratePromise]);

    const fromAmount = Math.round(amount * commission * 100) / 100;
    const toAmount = Math.round(amount * rate * 100) / 100;

    TransactionService.checkBalance(fromAccount, fromAmount);

    const updateFromAccountPromise = this.accountRepository.update({
      ...fromAccount,
      balance: TransactionService.getRecalculatedBalance(fromAccount.balance, -fromAmount),
    });
    const updateToAccountPromise = this.accountRepository.update({
      ...toAccount,
      balance: TransactionService.getRecalculatedBalance(toAccount.balance, toAmount),
    });

    await Promise.all([updateFromAccountPromise, updateToAccountPromise]);

    const createAt = new Date();

    return await this.repository.create({
      fromAccountId,
      toAccountId,
      amount,
      createAt,
      fromAccount,
      toAccount,
    });
  }

  create(): never {
    throw Error('Prohibited operation');
  }

  update(): never {
    throw Error('Prohibited operation');
  }

  delete(): never {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(id: string, period?: { from?: Date; to?: Date }): Promise<TransactionModel[]> {
    if (!period.from && !period.to) {
      return await this.repository.getAllByAccount(id);
    }

    const from = period.from ? new Date(period.from) : new Date(0);
    const to = period.to ? new Date(period.to) : new Date();

    return await this.repository.getAllByAccount(id, { from, to });
  }

  private static checkBalance(from: AccountModel, value: number): void {
    if (from.balance < value) {
      throw new TransactionBalanceException(
        `Insufficient funds in the account: ${from.id} balance: ${from.balance} amount: ${value}`,
      );
    }
  }

  private static getRecalculatedBalance(a: number, b: number): number {
    return Math.round((a + b) * 100) / 100;
  }

  private async getCurrenCommission(from: AccountModel, to: AccountModel): Promise<number> {
    if (from.bankId === to.bankId) {
      return 1;
    }

    const bankPromise = this.bankRepository.get(from.bankId);
    const userPromise = this.userRepository.get(from.userId);

    const [bank, user] = await Promise.all([bankPromise, userPromise]);

    const commission = user.face === FaceType.INDIVIDUAL ? bank.commissionForIndividual : bank.commissionForEntity;

    return 1 + commission / 100;
  }

  private async getCurrenRate(from: AccountModel, to: AccountModel): Promise<number> {
    if (from.currency === to.currency) {
      return 1;
    }

    const rate = await this.rateRepository.getByBank(from.bankId);

    const currentRate =
      rate[`${from.currency.toLocaleLowerCase()}${to.currency[0] + to.currency.slice(1).toLowerCase()}`];

    return typeof currentRate === 'number'
      ? Math.floor((1 / currentRate) * 100) / 100
      : rate[`${to.currency.toLocaleLowerCase()}${from.currency[0] + from.currency.slice(1).toLowerCase()}`];
  }
}
