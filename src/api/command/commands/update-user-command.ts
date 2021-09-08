import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';

@Injectable()
export class UpdateUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
      name: {
        type: 'string',
        required: false,
      },
    };
  }

  async performAdditionally(model: UserModel): Promise<UserModel> {
    return await this.userService.update(model);
  }

  getCommandDescription(): string {
    return `Update user by id

    Options:
      id=<id>                           User id
      name=[name]                       User name
      
      help                              Display help for command
    `;
  }
}
