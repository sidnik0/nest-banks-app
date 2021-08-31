import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getBanksHelp } from './helps-string';

@Injectable()
export class GetBanksCommand extends Command {
  constructor(private readonly bankService: BankService) {
    super();
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: getBanksHelp };

    const result = await this.bankService.getAll();

    return { result };
  }
}
