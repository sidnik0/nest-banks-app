import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class BankGetAllUsersCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.bankService.getAllUsers(params.id);

    return { result, initStringResult: 'List users' };
  }

  getCommandDescription(): string {
    return `Get all users in the bank

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
