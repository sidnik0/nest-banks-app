import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';
import { GetBankDto } from 'src/api/rest-dto/get-bank.dto';

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

  async performAdditionally(model: GetBankDto): Promise<BankModel> {
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
