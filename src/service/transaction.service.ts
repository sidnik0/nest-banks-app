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
import { CreateTransactionDto } from '../api/rest/rest-dto/create-transaction.dto';
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

  async createTransaction({ fromAccountId, toAccountId, amount }: CreateTransactionDto): Promise<TransactionModel> {
    const fromAccountPromise = this.accountRepository.get(fromAccountId);
    const toAccountPromise = this.accountRepository.get(toAccountId);

    const [fromAccount, toAccount] = await Promise.all([fromAccountPromise, toAccountPromise]);

    const commissionPromise = this.getCurrenCommission(fromAccount, toAccount);
    const ratePromise = this.getCurrenRate(fromAccount, toAccount);

    const [commission, rate] = await Promise.all([commissionPromise, ratePromise]);

    const fromAmount = Math.floor(amount * commission * 100) / 100;
    const toAmount = Math.floor(amount * rate * 100) / 100;

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
    });
  }

  async create(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async delete(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getAllByAccount(id: string): Promise<TransactionModel[]> {
    return await this.repository.getAllByAccount(id);
  }

  private static checkBalance(from: AccountModel, value: number): void {
    if (from.balance < value) {
      throw new TransactionBalanceException(
        `Insufficient funds in the account: ${from.id} balance: ${from.balance} amount: ${value}`,
      );
    }
  }

  private static getRecalculatedBalance(a: number, b: number): number {
    return Math.floor((a + b) * 100) / 100;
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

    const currentRate = rate[`${from.currency}_${to.currency}`];

    return currentRate ? Math.floor((1 / currentRate) * 100) / 100 : rate[`${to.currency}_${from.currency}`];
  }
}
