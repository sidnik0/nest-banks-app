import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IRateService } from '../../../service/interface/rate.service';
import { RateModel } from '../../../model/interface/rate.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class RateUpdateCommand extends BaseCommand {
  constructor(private readonly rateService: IRateService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.rateService.update(params as RateModel);

    return { result, initStringResult: 'Rate' };
  }

  getCommandDescription(): string {
    return `Update rate by bank

    Options:
      id=<bankId>                       Bank id
      rubUsd=[rubUsd]                   Rate RUB_USD
      rubEur=[rubEur]                   Rate RUB_EUR
      usdEur=[usdEur]                   Rate USD_EUR
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
      rubUsd: {
        type: 'number',
        required: false,
      },
      rubEur: {
        type: 'number',
        required: false,
      },
      usdEur: {
        type: 'number',
        required: false,
      },
    };
  }
}
