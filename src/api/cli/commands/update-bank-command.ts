import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { updateBankHelp } from './helps-string';

@Injectable()
export class UpdateBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.requiredProperties = {
      id: 'string',
      name: 'string',
      commissionForEntity: 'number',
      commissionForIndividual: 'number',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: updateBankHelp };

    const model = this.validateAndParseProperties<BankModel>(params);

    const result = await this.bankService.update(model);

    return { result };
  }
}
