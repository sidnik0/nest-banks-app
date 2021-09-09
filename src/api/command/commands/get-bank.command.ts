import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IBankService } from '../../../service/interface/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { GetBankDto } from '../../rest-dto/get-bank.dto';

@Injectable()
export class GetBankCommand extends Command {
  constructor(private readonly bankService: IBankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: GetBankDto): Promise<BankModel> {
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
