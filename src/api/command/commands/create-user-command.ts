import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';

@Injectable()
export class CreateUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.paramsDefinition = {
      name: {
        type: 'string',
        required: true,
      },
      face: {
        type: 'FaceType',
        required: true,
      },
    };
  }

  async performAdditionally(model: UserModel): Promise<UserModel> {
    return await this.userService.create(model)
  }

  getCommandDescription(): string {
    return `Create user

    Options:
      name=<name>                       User name
      face=<face>                       User face ("entity" || "individual")
      
      help                              Display help for command
    `;
  }
}
