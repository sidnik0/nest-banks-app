import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class GetAllAccountsByBankCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    const { params } = typedCommandDescriptor;

    const helpResult = await super.execute(typedCommandDescriptor, errorMessages);

    if (helpResult) {
      return helpResult;
    }

    delete params['help'];

    const result = await this.accountService.getAllByBank(params.id);

    return { result };
  }

  getCommandDescription(): string {
    return `Get all bank accounts

    Options:
      id=<bankId>                       Bank id
    
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
