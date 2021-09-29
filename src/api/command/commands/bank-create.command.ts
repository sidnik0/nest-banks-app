import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';
import { RateModel } from '../../../model/interface/rate.model';

@Injectable()
export class BankCreateCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.bankService.create(params as BankModel & RateModel);

    return { result, initStringResult: 'Bank' };
  }

  getCommandDescription(): string {
    return `Create bank

    Options:
      name=<name>                       Bank name
      commissionForEntity=[comEnt]      Entity commission
      commissionForIndividual=[comInd]  Individuals commission
      bynUsd=[bynUsd]                   Rate BYN_USD
      bynEur=[bynEur]                   Rate BYN_EUR
      usdEur=[usdEur]                   Rate USD_EUR
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      name: {
        type: 'string',
        required: true,
      },
      commissionForEntity: {
        type: 'number',
        required: false,
      },
      commissionForIndividual: {
        type: 'number',
        required: false,
      },
      bynUsd: {
        type: 'number',
        required: false,
      },
      bynEur: {
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
