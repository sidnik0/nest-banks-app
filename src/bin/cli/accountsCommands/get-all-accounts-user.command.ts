import { Injectable } from '@nestjs/common';
import { AccountsService } from '../../accounts/accounts.service';
import { HelpersService } from '../../../common/helpers/helpers.service';
import { commands } from '../commands';
import { getAllAccountHelp } from '../helps';

@Injectable()
export class GetAllAccountsUserCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly accountsService: AccountsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getAllAccountHelp);
      process.exit(0);
    }

    const userId = this.helpersService.convertingArgs(args, this.properties);

    try {
      userId[this.id] = this.parseId(userId[this.id]);

      const accounts = await this.accountsService.getAllByIdUser(
        userId[this.id],
      );

      console.log(accounts);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('User id not specified');
      process.exit(0);
    }

    return id;
  }
}
