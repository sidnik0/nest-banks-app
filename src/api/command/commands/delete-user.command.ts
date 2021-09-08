import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { Command } from './command';
import { DeleteUserDto } from 'src/api/rest-dto/delete-user.dto';

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

  async performAdditionally(model: DeleteUserDto): Promise<string> {
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
