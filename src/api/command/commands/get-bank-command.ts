import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';

@Injectable()
export class GetBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: BankModel): Promise<BankModel> {
    return await this.bankService.get(model.id);
  }

  getCommandDescription(): string {
    return `Get bank by id

    Options:
      id=<bankId>                       Bank id
      
      help                              Display help for command
    `;
  }
}
