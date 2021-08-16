import { Injectable } from '@nestjs/common';
import { BankUsersService } from '../../bankUsers/bank-users.service';
import { HelpersService } from '../../common/helpers/helpers.service';
import { commands } from '../commands';
import { getAllUsersHelp } from '../helps';

@Injectable()
export class GetAllUsersBankCommand {
  private readonly id = 'id';
  private readonly properties = [this.id];

  constructor(
    private readonly bankUsersService: BankUsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(getAllUsersHelp);
      process.exit(0);
    }

    const bankId = this.helpersService.convertingArgs(args, this.properties);

    try {
      bankId[this.id] = this.parseId(bankId[this.id]);

      const users = await this.bankUsersService.getUsersByIdBank(
        bankId[this.id],
      );

      console.log(users);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('Bank id not specified');
      process.exit(0);
    }

    return id;
  }
}
