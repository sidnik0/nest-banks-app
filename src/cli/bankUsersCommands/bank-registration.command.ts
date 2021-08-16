import { Injectable } from '@nestjs/common';

import { BankUsersService } from '../../bankUsers/bank-users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { CreateBankUserDto } from '../../bankUsers/dto/create-bank-user.dto';
import { commands } from '../commands';
import { bankRegistrationHelp } from '../helps';

@Injectable()
export class BankRegistrationCommand {
  private readonly idUser = 'idUser';
  private readonly idBank = 'idBank';
  private readonly currency = 'currency';
  private readonly balance = 'balance';
  private readonly properties = [
    this.idUser,
    this.idBank,
    this.currency,
    this.balance,
  ];

  constructor(
    private readonly bankUsersService: BankUsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(bankRegistrationHelp);
      process.exit(0);
    }

    const regUser = this.helpersService.convertingArgs(args, this.properties);

    try {
      regUser[this.idUser] = this.parseIdUser(regUser[this.idUser]);

      regUser[this.idBank] = this.parseIdBank(regUser[this.idBank]);

      regUser[this.currency] = this.parseCurrency(regUser[this.currency]);

      regUser[this.balance] = this.parseBalance(regUser[this.balance]);

      const account = await this.bankUsersService.createWithAccount(
        regUser as CreateBankUserDto,
      );

      console.log(account);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseIdUser(idUser: string): string {
    if (!idUser) {
      console.error('User id not specified');
      process.exit(0);
    }

    return idUser;
  }

  parseIdBank(idBank: string): string {
    if (!idBank) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return idBank;
  }

  parseCurrency(currency: string): string {
    if (!currency) {
      console.error('Currency not specified');
      process.exit(0);
    }

    if (currency === 'USD' || currency === 'EUR' || currency === 'RUB') {
      return currency;
    }

    return 'RUB';
  }

  parseBalance(balance: string): number {
    const bal = Number.parseInt(balance);

    return bal || 0;
  }
}
