import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { Command } from './command';
import { GetAllAccountsByUserDto } from 'src/api/rest-dto/get-all-accounts-by-user.dto';

@Injectable()
export class GetAllAccountsByUserCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: GetAllAccountsByUserDto): Promise<AccountModel[]> {
    return await this.accountService.getAllByUser(model.id);
  }

  getCommandDescription(): string {
    return `Get all user accounts

    Options:
      id=<userId>                       User id
    
      help                              Display help for command
    `;
  }
}
