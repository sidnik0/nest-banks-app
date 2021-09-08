import { Injectable } from '@nestjs/common';
import { GetAllBankUsersDto } from 'src/api/rest-dto/get-all-bank-users.dto';
import { UserModel } from 'src/model/interface/user.model';
import { BankService } from 'src/service/bank.service';
import { Command } from './command';

@Injectable()
export class GetAllBankUsersCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: GetAllBankUsersDto): Promise<UserModel[]> {
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