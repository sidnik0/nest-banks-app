import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class CreateBankCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.bankService.create(params as BankModel);

    return { result, initStringResult: 'Bank' };
  }

  getCommandDescription(): string {
    return `Create bank

    Options:
      name=<name>                       Bank name
      commissionForEntity=<comEnt>      Entity commission
      commissionForIndividual=<comInd>  Individuals commission
      
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
        required: true,
      },
      commissionForIndividual: {
        type: 'number',
        required: true,
      },
    };
  }
}
