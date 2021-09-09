import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IUserService } from '../../../service/interface/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { CreateUserDto } from '../../rest-dto/create-user.dto';

@Injectable()
export class CreateUserCommand extends Command {
  constructor(private readonly userService: IUserService) {
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

  async executeMainLogic(model: CreateUserDto): Promise<UserModel> {
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
