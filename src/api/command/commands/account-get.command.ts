import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class AccountGetCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.accountService.get(params.id);

    return { result, initStringResult: 'Account' };
  }

  getCommandDescription(): string {
    return `Get account by id

    Options:
      id=<accountId>                    Account id
      
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
