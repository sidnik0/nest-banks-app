import { Injectable } from '@nestjs/common';
import { RIdHelper } from '../../common/helper/r-id.helper';
import { AccountsService } from '../accounts/accounts.service';
import { BanksService } from '../banks/banks.service';
import { UsersService } from '../users/users.service';

import { TransactionInterface } from './interfaces/transaction.interface';
import { AccountInterface } from '../accounts/interfaces/account.interface';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PeriodTransactionDto } from './dto/period-transaction.dto';

@Injectable()
export class TransactionsService {
  private transactions: Map<string, TransactionInterface> = new Map();

  constructor(
    private readonly helpersService: RIdHelper,
    private readonly accountsService: AccountsService,
    private readonly banksService: BanksService,
    private readonly usersService: UsersService,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<TransactionInterface> {
    const id = this.helpersService.createId();

    const fromAccountPromise = this.accountsService.getById(
      createTransactionDto.fromAccountId,
    );
    const toAccountPromise = this.accountsService.getById(
      createTransactionDto.toAccountId,
    );

    const [fromAccount, toAccount] = await Promise.all([
      fromAccountPromise,
      toAccountPromise,
    ]);

    TransactionsService.currencyCheck(fromAccount, toAccount);
    TransactionsService.balanceCheck(fromAccount, createTransactionDto);

    const commission = await this.getCurrentCommission(fromAccount, toAccount);

    const updateFromAccountPromise = this.accountsService.updateById(
      fromAccount.id,
      {
        balance: TransactionsService.updateBalance(
          fromAccount.balance,
          -createTransactionDto.value,
          commission,
        ),
      },
    );
    const updateToAccountPromise = this.accountsService.updateById(
      toAccount.id,
      {
        balance: TransactionsService.updateBalance(
          toAccount.balance,
          createTransactionDto.value,
        ),
      },
    );

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

  async getByIdAccount(
    idAccount: string,
    period?: PeriodTransactionDto,
  ): Promise<Array<TransactionInterface>> {
    const result = [];

    for (const obj of this.transactions.values()) {
      if (obj.fromAccountId === idAccount || obj.toAccountId === idAccount) {
        result.push(obj);
      }
    }
    if (!period) return result;

    return TransactionsService.filterByPeriod(result, period);
  }

  async get(): Promise<Map<string, TransactionInterface>> {
    return this.transactions;
  }

  private static updateBalance(a: number, b: number, com = 1): number {
    return Math.floor((a + b * com) * 100) / 100;
  }

  private static balanceCheck(
    account: AccountInterface,
    createTransactionDto: CreateTransactionDto,
  ): void {
    if (account.balance < createTransactionDto.value) {
      throw Error('Not enough money in the account');
    }
  }

  private static currencyCheck(
    fromAccount: AccountInterface,
    toAccount: AccountInterface,
  ): void {
    if (fromAccount.currency !== toAccount.currency) {
      throw Error('Another currency on the account');
    }
  }

  private static filterByPeriod(
    transactions: Array<TransactionInterface>,
    period: PeriodTransactionDto,
  ): Array<TransactionInterface> {
    return transactions.map((transaction) => {
      if (
        period.from <= transaction.create &&
        transaction.create <= period.to
      ) {
        return transaction;
      }
    });
  }

  private async getCurrentCommission(
    fromAccount: AccountInterface,
    toAccount: AccountInterface,
  ): Promise<number> {
    const fromBankPromise = this.banksService.getById(fromAccount.idBank);
    const toBankPromise = this.banksService.getById(toAccount.idBank);
    const fromUserPromise = this.usersService.getById(fromAccount.idUser);

    const [fromBank, toBank, fromUser] = await Promise.all([
      fromBankPromise,
      toBankPromise,
      fromUserPromise,
    ]);

    if (fromBank.id !== toBank.id) return 1;

    return fromUser.face === 'entity' ? fromBank.comEnt : fromBank.comInd;
  }
}
