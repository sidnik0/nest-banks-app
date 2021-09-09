import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IUserService } from '../../../service/interface/user.service';
import { BankModel } from '../../../model/interface/bank.model';
import { GetAllUserBanksDto } from '../../rest-dto/get-all-user-banks.dto';

@Injectable()
export class GetAllUserBanksCommand extends Command {
  constructor(private readonly userService: IUserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: GetAllUserBanksDto): Promise<BankModel[]> {
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