import { Command, CommandRunner, Option } from 'nest-commander';
import { AccountsService } from '../../accounts/accounts.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { CreateAccountDto } from '../../accounts/dto/create-account.dto';

@Command({
  name: 'create-account',
  description: 'Create a bank account',
})
export class CreateAccountCommand implements CommandRunner {
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
    private readonly accountsService: AccountsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: CreateAccountDto): Promise<void> {
    const regUser = this.helpersService.convertingArgs(args, this.properties);

    if (!options[this.idUser]) {
      regUser[this.idUser] = this.parseIdUser(regUser[this.idUser]);
    }

    if (!options[this.idBank]) {
      regUser[this.idBank] = this.parseIdBank(regUser[this.idBank]);
    }

    if (!options[this.currency]) {
      regUser[this.currency] = this.parseCurrency(regUser[this.currency]);
    }

    if (!options[this.balance]) {
      regUser[this.balance] = this.parseBalance(regUser[this.balance]);
    }

    try {
      const account = await this.accountsService.create({
        ...regUser,
        ...options,
      });

      console.log(account);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  @Option({
    flags: '-u, idUser=<idUser>',
    description: 'User id',
  })
  parseIdUser(idUser: string): string {
    if (!idUser) {
      console.error('User id not specified');
      process.exit(0);
    }

    return idUser;
  }

  @Option({
    flags: '-b, idBank=<idBank>',
    description: 'Bank id',
  })
  parseIdBank(idBank: string): string {
    if (!idBank) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return idBank;
  }

  @Option({
    flags: '-c, currency=<currency>',
    description: 'currency ("USD" | "EUR" | "RUB")',
  })
  parseCurrency(currency: string): string {
    if (!currency) {
      console.error('Currency not specified');
      process.exit(0);
    }

    if (currency === 'USD' || currency === 'EUR' || currency !== 'RUB') {
      return currency;
    }

    return 'RUB';
  }

  @Option({
    flags: '-bl, balance=<balance>',
    description: 'balance',
  })
  parseBalance(balance: string): number {
    const bal = Number.parseInt(balance);

    return bal || 0;
  }
}
