import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IUserService } from '../../../service/interface/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { GetUserDto } from '../../rest-dto/get-user.dto';

@Injectable()
export class GetUserCommand extends Command {
  constructor(private readonly userService: IUserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: GetUserDto): Promise<UserModel> {
    return await this.userService.get(model.id);
  }

  getCommandDescription(): string {
    return `Get user by id

    Options:
      id=<UserId>                       User id
      
      help                              Display help for command
    `;
  }
}
