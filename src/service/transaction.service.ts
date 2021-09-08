import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../repository/interface/transaction.repository';
import { AccountRepository } from '../repository/interface/account.repository';
import { BankRepository } from '../repository/interface/bank.repository';
import { UserRepository } from '../repository/interface/user.repository';
import { TransactionModel } from '../model/interface/transaction.model';
import { AccountModel } from '../model/interface/account.model';
import { FaceType } from '../types/face.type';
import { TransactionCurrencyException } from '../common/exseption/transaction-currency-exception';
import { TransactionBalanceException } from '../common/exseption/transaction-balance-exception';
import { BaseService } from './base.service';
import { CreateTransactionDto } from 'src/api/rest-dto/create-transaction.dto';

@Injectable()
export class TransactionService extends BaseService<TransactionModel> {
  constructor(
    protected readonly repository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
    private readonly bankRepository: BankRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(repository);
  }

  async createTransaction({ fromAccountId, toAccountId, amount }: CreateTransactionDto): Promise<TransactionModel> {
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

  private static checkCurrency(from: AccountModel, to: AccountModel): void {
    if (from.currency !== to.currency)
      throw new TransactionCurrencyException(
        `Currency do not match. From Account: ${from.id}-${from.currency} To Account: ${to.id}-${to.currency}`,
      );
  }

  private static checkBalance(from: AccountModel, value: number): void {
    if (from.balance < value)
      throw new TransactionBalanceException(
        `Insufficient funds in the account: ${from.id} balance: ${from.balance} amount: ${value}`,
      );
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
        : bank.commissionForEntity;

    return 1 + commission / 100;
  }
}
