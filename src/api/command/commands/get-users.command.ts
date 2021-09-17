import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';

@Injectable()
export class GetUsersCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async execute(typedCommandDescriptor: TypedCommandDescriptor, errorMessages?: string[]): Promise<CommandResult> {
    const helpResult = await super.execute(typedCommandDescriptor, errorMessages);

    if (helpResult) {
      return helpResult;
    }

    const result = await this.userService.getAll();

    return { result };
  }

  getCommandDescription(): string {
    return `Get all users

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
