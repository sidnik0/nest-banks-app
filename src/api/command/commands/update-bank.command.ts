import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class UpdateBankCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    const { params } = typedCommandDescriptor;

    const helpResult = await super.execute(typedCommandDescriptor, errorMessages);

    if (helpResult) {
      return helpResult;
    }

    delete params['help'];

    const result = await this.bankService.update(params as BankModel);

    return { result };
  }

  getCommandDescription(): string {
    return `Update bank by id

    Options:
      id=<id>                           Bank id
      name=[name]                       Bank name
      commissionForEntity=[comEnt]      Entity commission
      commissionForIndividual=[comInd]  Individuals commission
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'string',
        required: false,
      },
      commissionForEntity: {
        type: 'number',
        required: false,
      },
      commissionForIndividual: {
        type: 'number',
        required: false,
      },
    };
  }
}
