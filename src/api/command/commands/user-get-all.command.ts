import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class UserGetAllCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async doExecute(): Promise<CommandResult> {
    const result = await this.userService.getAll();

    return { result, initStringResult: 'List users' };
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
