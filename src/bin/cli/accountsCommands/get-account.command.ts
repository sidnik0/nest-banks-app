import { Injectable } from '@nestjs/common';
import { AccountsService } from '../../accounts/accounts.service';
import { HelpersService } from '../../../common/helpers/helpers.service';
import { commands } from '../commands';
import { getAccountHelp } from '../helps';

@Injectable()
export class GetAccountCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getAccountHelp);
      process.exit(0);
    }

    const account = this.helpersService.convertingArgs(args, this.properties);

    try {
      account[this.id] = this.parseId(account[this.id]);

      const currentAccount = await this.accountsService.getById(
        account[this.id],
      );

      console.log(currentAccount);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('Account id not specified');
      process.exit(0);
    }

    return id;
  }
}
