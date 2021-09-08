import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';
import { UpdateUserDto } from 'src/api/rest-dto/update-user.dto';

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

  async performAdditionally(model: UpdateUserDto): Promise<UserModel> {
    return await this.userService.update(model as UserModel);
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
