import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class DeleteBankCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor): Promise<CommandResult> {
    const { params } = typedCommandDescriptor;

    const helpResult = await super.execute(typedCommandDescriptor);

    if (helpResult) {
      return helpResult;
    }

    delete params['help'];

    await this.bankService.delete(params.id);

    return { result: `Bank with id=${params.id} deleted` };
  }

  getCommandDescription(): string {
    return `Delete bank by id

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
