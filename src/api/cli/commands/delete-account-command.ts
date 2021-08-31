import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { deleteAccountHelp } from './helps-string';

@Injectable()
export class DeleteAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: deleteAccountHelp };

    const model = this.validateAndParseProperties<AccountModel>(params);

    await this.accountService.delete(model.id);

    return { result: `Account with id=${model.id} deleted` };
  }
}
