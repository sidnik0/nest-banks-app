import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { UpdateAccountDto } from '../../rest-dto/update-account.dto';

@Injectable()
export class UpdateAccountCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
      amount: {
        type: 'number',
        required: true,
      },
      operation: {
        type: 'OperationType',
        required: true,
      },
    };
  }

  async executeMainLogic({id, ...model}: UpdateAccountDto): Promise<any> {
    return await this.accountService.updateBalance(id, model);
  }

  getCommandDescription(): string {
    return `Update account by id

    Options:
      id=<accountId>                    Account id
      amount=<amount>                   Amount
      operation=<boolean>               Operation ("replenishment" || "withdrawal")
      
      help                              Display help for command
    `;
  }
}
