import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { GetAccountDto } from '../../rest-dto/get-account.dto';

@Injectable()
export class GetAccountCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: GetAccountDto): Promise<AccountModel> {
    return await this.accountService.get(model.id);
  }

  getCommandDescription(): string {
    return `Get account by id

    Options:
      id=<accountId>                    Account id
      
      help                              Display help for command
    `;
  }
}
