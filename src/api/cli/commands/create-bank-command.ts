import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';

@Injectable()
export class CreateBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.requiredProperties = {
      name: 'string',
      commissionForEntities: 'number',
      commissionForIndividual: 'number',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const model = this.validateAndParseProperties<BankModel>(params);
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { message: 'HELP', result: '' };

    const result = await this.bankService.create(model);

    return { message: 'OK', result };
  }
}
