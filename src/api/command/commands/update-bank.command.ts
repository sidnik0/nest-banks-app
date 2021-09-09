import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { UpdateBankDto } from '../../rest-dto/update-bank.dto';

@Injectable()
export class UpdateBankCommand extends Command {
  constructor(private readonly bankService: IBankService) {
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

  async executeMainLogic(model: UpdateBankDto): Promise<BankModel> {
    return await this.bankService.update(model as BankModel);
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
