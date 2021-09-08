import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';

@Injectable()
export class DeleteUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async performAdditionally(model: UserModel): Promise<string> {
    await this.userService.delete(model.id);

    return `User with id=${model.id} deleted`;
  }

  getCommandDescription(): string {
    return `Delete user by id

    Options:
      id=<userId>                       User id
      
      help                              Display help for command
    `;
  }
}
