import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IAccountService } from '../../../service/interface/account.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class GetAccountsCommand extends BaseCommand {
  constructor(private readonly accountService: IAccountService) {
    super();
  }

  async doExecute(): Promise<CommandResult> {
    const result = await this.accountService.getAll();

    return { result, initStringResult: 'List accounts' };
  }

  getCommandDescription(): string {
    return `Get all accounts

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
