import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { createBankHelp } from './helps-string';

@Injectable()
export class CreateBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.requiredProperties = {
      name: 'string',
      commissionForEntity: 'number',
      commissionForIndividual: 'number',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: createBankHelp };

    const model = this.validateAndParseProperties<BankModel>(params);

    const result = await this.bankService.create(model);

    return { result };
  }
}
