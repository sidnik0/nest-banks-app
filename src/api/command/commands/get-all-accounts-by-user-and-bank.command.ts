import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { Command } from './command';
import { GetAllAccountsByUserAndBankDto } from 'src/api/rest-dto/get-all-accounts-by-user-and-bank.dto';

@Injectable()
export class GetAllAccountsByUserAndBankCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.paramsDefinition = {
      userId: {
        type: 'string',
        required: true,
      },
      bankId: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: GetAllAccountsByUserAndBankDto): Promise<AccountModel[]> {
    return await this.accountService.getAllByUserAndBank(
      model.userId,
      model.bankId,
    );
  }

  getCommandDescription(): string {
    return `Get all user accounts in the bank

    Options:
      userId=<userId>                       User id
      bankId=<bankId>                       Bank id
    
      help                              Display help for command
    `;
  }
}
