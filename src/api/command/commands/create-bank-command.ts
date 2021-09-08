import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';

@Injectable()
export class CreateBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.paramsDefinition = {
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

  async performAdditionally(model: BankModel): Promise<BankModel> {
    return await this.bankService.create(model);
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
}
