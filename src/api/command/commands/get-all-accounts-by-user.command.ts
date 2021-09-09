import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IAccountService } from '../../../service/interface/account.service';
import { AccountModel } from '../../../model/interface/account.model';
import { GetAllAccountsByUserDto } from '../../rest-dto/get-all-accounts-by-user.dto';

@Injectable()
export class GetAllAccountsByUserCommand extends Command {
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
    model: GetAllAccountsByUserDto,
  ): Promise<AccountModel[]> {
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
