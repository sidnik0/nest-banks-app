import { Injectable } from '@nestjs/common';
import { GetAllUserBanksDto } from 'src/api/rest-dto/get-all-user-banks.dto';
import { BankModel } from 'src/model/interface/bank.model';
import { UserService } from 'src/service/user.service';
import { Command } from './command';

@Injectable()
export class GetAllUserBanksCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: GetAllUserBanksDto): Promise<BankModel[]> {
    return await this.userService.getAllBanks(model.id);
  }

  getCommandDescription(): string {
    return `Get all user banks

    Options:
      id=<userId>                       User id
    
      help                              Display help for command
    `;
  }
}