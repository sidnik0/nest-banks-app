import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IBankService } from '../../../service/interface/bank.service';
import { UserModel } from '../../../model/interface/user.model';
import { GetAllBankUsersDto } from '../../rest-dto/get-all-bank-users.dto';

@Injectable()
export class GetAllBankUsersCommand extends Command {
  constructor(private readonly bankService: IBankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: GetAllBankUsersDto): Promise<UserModel[]> {
    return await this.bankService.getAllUsers(model.id);
  }

  getCommandDescription(): string {
    return `Get all users in the bank

    Options:
      id=<bankId>                       Bank id
    
      help                              Display help for command
    `;
  }
}