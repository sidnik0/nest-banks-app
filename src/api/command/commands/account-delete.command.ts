import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class AccountDeleteCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    await this.accountService.delete(params.id);

    return { result: `Account with id=${params.id} deleted`, initStringResult: 'Account' };
  }

  getCommandDescription(): string {
    return `Delete account by id

    Options:
      id=<AccountId>                    Account id
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
    };
  }
}
