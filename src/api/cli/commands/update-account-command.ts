import { Injectable } from '@nestjs/common';
import { AccountService } from '../../../service/account.service';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { updateAccountHelp } from './helps-string';
import { OperationType } from '../../../types/operation.type';

@Injectable()
export class UpdateAccountCommand extends Command {
  constructor(private readonly accountService: AccountService) {
    super();

    this.requiredProperties = {
      id: 'string',
      amount: 'number',
      operation: 'OperationType',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: updateAccountHelp };

    const { id, ...model } = this.validateAndParseProperties<{
      id: string;
      amount: number;
      operation: OperationType;
    }>(params);

    const result = await this.accountService.updateBalance(id, model);

    return { result };
  }
}
