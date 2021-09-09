import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IUserService } from '../../../service/interface/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { UpdateUserDto } from '../../rest-dto/update-user.dto';

@Injectable()
export class UpdateUserCommand extends Command {
  constructor(private readonly userService: IUserService) {
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

  async executeMainLogic(model: UpdateUserDto): Promise<UserModel> {
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
