import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

@Injectable()
export class CreateAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.requiredProperties = {
      userId: 'string',
      bankId: 'string',
      currency: 'CurrencyType',
      balance: 'number',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const model = this.validateAndParseProperties<AccountModel>(params);
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { message: 'HELP', result: '' };

    const result = await this.accountService.create(model);

    return { message: 'OK', result };
  }
}
