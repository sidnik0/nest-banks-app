import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { Command } from './command';
import { GetAllAccountsByBankDto } from 'src/api/rest-dto/get-all-accounts-by-bank.dto';

@Injectable()
export class GetAllAccountsByBankCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: GetAllAccountsByBankDto): Promise<AccountModel[]> {
    return await this.accountService.getAllByBank(model.id);
  }

  getCommandDescription(): string {
    return `Get all bank accounts

    Options:
      id=<bankId>                       Bank id
    
      help                              Display help for command
    `;
  }
}
