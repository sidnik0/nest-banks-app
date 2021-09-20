import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class UserUpdateCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.userService.update(params as UserModel);

    return { result, initStringResult: 'User' };
  }

  getCommandDescription(): string {
    return `Update user by id

    Options:
      id=<id>                           User id
      name=[name]                       User name
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
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
}
