import { Injectable } from '@nestjs/common';
import { BankService } from '../../../service/bank.service';
import { BankModel } from '../../../model/interface/bank.model';
import { CommandWithOptionalProperties } from './command-with-optional-properties';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { updateBankHelp } from './helps-string';

@Injectable()
export class UpdateBankCommand extends CommandWithOptionalProperties {
  constructor(private readonly bankService: BankService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };

    this.optionalProperties = {
      name: 'string',
      commissionForEntity: 'number',
      commissionForIndividual: 'number',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: updateBankHelp };

    const requiredModel = this.validateAndParseProperties<BankModel>(params);
    const optionalModel = this.parseOptionalProperties<BankModel>(params);

    const result = await this.bankService.update({
      ...requiredModel,
      ...optionalModel,
    });

    return { result };
  }
}
