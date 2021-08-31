import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { deleteBankHelp } from './helps-string';

@Injectable()
export class DeleteBankCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: deleteBankHelp };

    const model = this.validateAndParseProperties<BankModel>(params);

    await this.bankService.delete(model.id);

    return { result: `Bank with id=${model.id} deleted` };
  }
}
