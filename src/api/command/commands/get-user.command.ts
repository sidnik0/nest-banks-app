import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class GetUserCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async execute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const result = await this.userService.get(params.id);

    return { result };
  }

  getCommandDescription(): string {
    return `Get user by id

    Options:
      id=<UserId>                       User id
      
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
