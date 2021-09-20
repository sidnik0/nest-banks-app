import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IBankService } from '../../../service/interface/bank.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class BankGetAllCommand extends BaseCommand {
  constructor(private readonly bankService: IBankService) {
    super();
  }

  async doExecute(): Promise<CommandResult> {
    const result = await this.bankService.getAll();

    return { result, initStringResult: 'List banks' };
  }

  getCommandDescription(): string {
    return `Get all banks

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
