import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { DeleteAccountDto } from '../../rest-dto/delete-account.dto';

@Injectable()
export class DeleteAccountCommand extends Command {
  constructor(private readonly accountService: IAccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: DeleteAccountDto): Promise<string> {
    await this.accountService.delete(model.id);

    return `Account with id=${model.id} deleted`;
  }

  getCommandDescription(): string {
    return `Delete account by id

    Options:
      id=<AccountId>                    Account id
      
      help                              Display help for command
    `;
  }
}
