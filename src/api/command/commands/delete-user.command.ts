import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IUserService } from '../../../service/interface/user.service';
import { DeleteUserDto } from '../../rest-dto/delete-user.dto';

@Injectable()
export class DeleteUserCommand extends Command {
  constructor(private readonly userService: IUserService) {
    super();

    this.paramsDefinition = {
      id: {
        type: 'string',
        required: true,
      },
    };
  }

  async executeMainLogic(model: DeleteUserDto): Promise<string> {
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
