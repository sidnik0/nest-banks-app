import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class DeleteUserCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    await this.userService.delete(params.id);

    return { result: `User with id=${params.id} deleted`, initStringResult: 'User' };
  }

  getCommandDescription(): string {
    return `Delete user by id

    Options:
      id=<userId>                       User id
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      id: {
        type: 'string',
        required: true,
      },
    };
  }
}
