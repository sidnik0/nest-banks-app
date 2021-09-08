import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';

@Injectable()
export class UpdateBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true
      },
      name: {
        type: 'string',
        required: false
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

  async performAdditionally(model: BankModel): Promise<BankModel> {
    return await this.bankService.update(model);
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
}
