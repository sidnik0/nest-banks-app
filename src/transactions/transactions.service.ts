import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { AccountsService } from '../accounts/accounts.service';

import { TransactionInterface } from './interfaces/transaction.interface';
import { AccountInterface } from '../accounts/interfaces/account.interface';

import { AllTransactionInterface } from './interfaces/all-transaction.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateAccountDto } from '../accounts/dto/update-account.dto';

@Injectable()
export class TransactionsService {
  private transactions: Map<string, TransactionInterface> = new Map();

  constructor(
    private readonly helpersService: HelpersService,
    private readonly accountsService: AccountsService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionInterface> {
    const id = this.helpersService.createId();

    const fromAccountPromise = this.getAccountById(
      createTransactionDto.fromAccountId,
    ).then((account): AccountInterface => {
      return TransactionsService.balanceCheck(account, createTransactionDto);
    });

    const toAccountPromise = this.getAccountById(
      createTransactionDto.toAccountId,
    );

    const [fromAccount, toAccount] = await Promise.all([
      fromAccountPromise,
      toAccountPromise,
    ]);

    TransactionsService.currencyCheck(fromAccount, toAccount);

    const updateFromAccountPromise = this.updateAccountById(fromAccount.id, {
      balance: fromAccount.balance - createTransactionDto.value,
    } as UpdateAccountDto);
    const updateToAccountPromise = this.updateAccountById(toAccount.id, {
      balance: toAccount.balance + createTransactionDto.value,
    } as UpdateAccountDto);

    await Promise.all([updateFromAccountPromise, updateToAccountPromise]);

    const create = Date.now();

    this.transactions.set(id, {
      ...createTransactionDto,
      create,
      id,
    });

    return this.transactions.get(id);
  }

  async getById(id: string): Promise<TransactionInterface> {
    return this.transactions.get(id);
  }

  async getByIdAccount(idAccount: string): Promise<AllTransactionInterface> {
    const fromResult = [];
    const toResult = [];

    for (const obj of this.transactions.values()) {
      if (obj.fromAccountId === idAccount) {
        fromResult.push(obj);
      } else if (obj.toAccountId === idAccount) {
        toResult.push(obj);
      } else {
      }
    }

    return { from: fromResult, to: toResult };
  }

  // async get(): Promise<Map<string, TransactionInterface>> {
  //   return this.transactions;
  // }

  private async getAccountById(id: string): Promise<AccountInterface> {
    return this.accountsService.getById(id);
  }

  private async updateAccountById(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<void> {
    await this.accountsService.update(id, updateAccountDto);
  }

  private static balanceCheck(
    account: AccountInterface,
    createTransactionDto: CreateTransactionDto,
  ): AccountInterface {
    if (account.balance < createTransactionDto.value)
      throw Error('Not enough money in the account');

    return account;
  }

  private static currencyCheck(
    fromAccount: AccountInterface,
    toAccount: AccountInterface,
  ): void {
    if (fromAccount.currency !== toAccount.currency)
      throw Error('Another currency on the account');
  }
}
