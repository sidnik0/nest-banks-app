import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';

@Injectable()
export class DeleteBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: BankModel): Promise<string> {
    await this.bankService.delete(model.id);

    return `Bank with id=${model.id} deleted`;
  }

  getCommandDescription(): string {
    return `Delete bank by id

    Options:
      id=<bankId>                       Bank id
      
      help                              Display help for command
    `;
  }
}
