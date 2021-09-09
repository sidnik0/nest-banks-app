import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { GetAllAccountsByBankDto } from '../../rest-dto/get-all-accounts-by-bank.dto';

@Injectable()
export class GetAllAccountsByBankCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(
    model: GetAllAccountsByBankDto,
  ): Promise<AccountModel[]> {
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
