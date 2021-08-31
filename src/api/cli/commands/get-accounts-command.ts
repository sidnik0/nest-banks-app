import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getAccountsHelp } from './helps-string';

@Injectable()
export class GetAccountsCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: getAccountsHelp };

    const result = await this.accountService.getAll();

    return { result };
  }
}
