import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getAllAccountsByUserHelp } from './helps-string';

@Injectable()
export class GetAllAccountsByUserCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: getAllAccountsByUserHelp };

    const model = this.validateAndParseProperties<AccountModel>(params);

    const result = await this.accountService.getAllByUser(model.id);

    return { result };
  }
}
