import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';

@Injectable()
export class GetUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: UserModel): Promise<UserModel> {
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
