import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { GetAllAccountsByUserAndBankDto } from 'src/api/rest-dto/get-all-accounts-by-user-and-bank.dto';

@Injectable()
export class GetAllAccountsByUserAndBankCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
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

  async executeMainLogic(model: GetAllAccountsByUserAndBankDto): Promise<AccountModel[]> {
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
