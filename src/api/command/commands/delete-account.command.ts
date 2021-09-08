import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { AccountService } from '../../../service/account.service';
import { DeleteAccountDto } from 'src/api/rest-dto/delete-account.dto';

@Injectable()
export class DeleteAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: DeleteAccountDto): Promise<string> {
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
