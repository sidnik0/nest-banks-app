import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { Command } from './command';
import { UpdateAccountDto } from 'src/api/rest-dto/update-account.dto';

@Injectable()
export class UpdateAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
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

  async performAdditionally({id, ...model}: UpdateAccountDto): Promise<any> {
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
