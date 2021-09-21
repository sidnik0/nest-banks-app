import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IRateService } from '../../../service/interface/rate.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class RateGetCommand extends BaseCommand {
  constructor(private readonly rateService: IRateService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.rateService.getByBank(params.id);

    return { result, initStringResult: 'Rate' };
  }

  getCommandDescription(): string {
    return `Get rate by bank

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
