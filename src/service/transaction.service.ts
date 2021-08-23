import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../repository/interface/transaction.repository';
import { IAccountRepository } from '../repository/interface/account.repository';
import { IBankRepository } from '../repository/interface/bank.repository';
import { IUserRepository } from '../repository/interface/user.repository';
import { TransactionModel } from '../model/interface/transaction.model';
import { AccountModel } from '../model/interface/account.model';
import { FaceType } from '../types/face.type';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: ITransactionRepository,
    private readonly accountRepository: IAccountRepository,
    private readonly bankRepository: IBankRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async create(
    fromAccountId: string,
    toAccountId: string,
    amount: number,
  ): Promise<TransactionModel> {
    const fromAccountPromise = this.accountRepository.get(fromAccountId);
    const toAccountPromise = this.accountRepository.get(toAccountId);

    const [fromAccount, toAccount] = await Promise.all([
      fromAccountPromise,
      toAccountPromise,
    ]);

    TransactionService.checkCurrency(fromAccount, toAccount);

    const commission = await this.getCurrenCommission(fromAccount, toAccount);
    const value = amount * commission;

    TransactionService.checkBalance(fromAccount, value);

    const updateFromAccountPromise = this.accountRepository.update({
      ...fromAccount,
      balance: TransactionService.updateBalance(fromAccount.balance, -value),
    });
    const updateToAccountPromise = this.accountRepository.update({
      ...toAccount,
      balance: TransactionService.updateBalance(toAccount.balance, value),
    });

    await Promise.all([updateFromAccountPromise, updateToAccountPromise]);

    const createAt = new Date();

    return await this.transactionRepository.create({
      fromAccountId,
      toAccountId,
      amount,
      createAt,
    });
  }

  async get(id): Promise<TransactionModel> {
    return await this.transactionRepository.get(id);
  }

  async getAll(): Promise<TransactionModel[]> {
    return this.transactionRepository.getAll();
  }

  async update(model: TransactionModel): Promise<TransactionModel> {
    return await this.transactionRepository.update(model);
  }

  async delete(id: string): Promise<boolean> {
    return await this.transactionRepository.delete(id);
  }

  async getAllByAccount(id: string): Promise<TransactionModel[]> {
    return await this.transactionRepository.getAllByAccount(id);
  }

  private static checkCurrency(from: AccountModel, to: AccountModel): void {
    if (from.currency !== to.currency) throw Error();
  }

  private static checkBalance(from: AccountModel, value: number): void {
    if (from.balance < value) throw Error();
  }

  private static updateBalance(a: number, b: number): number {
    return Math.floor((a + b) * 100) / 100;
  }

  private async getCurrenCommission(
    from: AccountModel,
    to: AccountModel,
  ): Promise<number> {
    if (from.bankId === to.bankId) return 1;

    const bankPromise = this.bankRepository.get(from.bankId);
    const userPromise = this.userRepository.get(from.userId);

    const [bank, user] = await Promise.all([bankPromise, userPromise]);

    const commission =
      user.face === FaceType.INDIVIDUAL
        ? bank.commissionForIndividual
        : bank.commissionForEntities;

    return 1 + commission / 100;
  }
}
