import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IRateService } from '../../../service/interface/rate.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { CommandResult } from '../values-object/command-result';

@Injectable()
export class RateGetAllCommand extends BaseCommand {
  constructor(private readonly rateService: IRateService) {
    super();
  }

  async doExecute(): Promise<CommandResult> {
    const result = await this.rateService.getAll();

    return { result, initStringResult: 'List rates' };
  }

  getCommandDescription(): string {
    return `Get all rates

    Options:
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {};
  }
}
