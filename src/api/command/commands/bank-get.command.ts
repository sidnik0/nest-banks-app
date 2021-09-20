import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class BankGetCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.bankService.get(params.id);

    return { result, initStringResult: 'Bank' };
  }

  getCommandDescription(): string {
    return `Get bank by id

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
