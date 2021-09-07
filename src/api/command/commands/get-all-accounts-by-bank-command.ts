import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getAllAccountsByBankHelp } from './helps-string';

@Injectable()
export class GetAllAccountsByBankCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: getAllAccountsByBankHelp };

    const model = this.validateAndParseProperties<AccountModel>(params);

    const result = await this.accountService.getAllByBank(model.id);

    return { result };
  }
}
