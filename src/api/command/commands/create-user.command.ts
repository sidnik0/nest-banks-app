import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class CreateUserCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    const { params } = typedCommandDescriptor;

    const helpResult = await super.execute(typedCommandDescriptor, errorMessages);

    if (helpResult) {
      return helpResult;
    }

    delete params['help'];

    const result = await this.userService.create(params as UserModel);

    return { result };
  }

  getCommandDescription(): string {
    return `Create user

    Options:
      name=<name>                       User name
      face=<face>                       User face ("entity" || "individual")
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
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
}
