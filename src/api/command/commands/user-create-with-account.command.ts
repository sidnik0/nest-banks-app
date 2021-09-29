import { Injectable } from '@nestjs/common';
import { BaseCommand } from './base.command';
import { IUserService } from '../../../service/interface/user.service';
import { ParamsDefinition } from '../values-object/params-definition';
import { TypedCommandDescriptor } from '../values-object/typed-command-descriptor';
import { CommandResult } from '../values-object/command-result';
// import { BankModel } from '../../model/interface/bank.model';
// import { RateModel } from '../../model/interface/rate.model';

@Injectable()
export class UserCreateWithAccountCommand extends BaseCommand {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async doExecute({ params }: TypedCommandDescriptor): Promise<CommandResult> {
    const {
      userName,
      face,
      bankName,
      commissionForEntity,
      commissionForIndividual,
      bynUsd,
      bynEur,
      usdEur,
      balance,
      currency,
    } = params;

    const user = { name: userName, face };
    const bank = { name: bankName, commissionForEntity, commissionForIndividual };
    const rate = { bynUsd, bynEur, usdEur, bankId: null };
    const account = { balance, currency };

    const result = await this.userService.createUserWithAccountCreation({ user, bank, rate, account });

    return { result, initStringResult: 'User' };
  }

  getCommandDescription(): string {
    return `Create user with account

    Options:
      userName=<userName>               User name
      face=<face>                       User face ("entity" || "individual")
      bankName=<bankName>               Bank name
      commissionForEntity=[comEnt]      Entity commission
      commissionForIndividual=[comInd]  Individuals commission
      bynUsd=[bynUsd]                   Rate BYN_USD
      bynEur=[bynEur]                   Rate BYN_EUR
      usdEur=[usdEur]                   Rate USD_EUR
      currency=<currency>               Currency ("BYN" || "USD" || "EUR")
      balance=[balance]                 Starting balance
      
      help                              Display help for command
    `;
  }

  initParamsDefinition(): ParamsDefinition {
    return {
      userName: {
        type: 'string',
        required: true,
      },
      face: {
        type: 'FaceType',
        required: true,
      },
      bankName: {
        type: 'string',
        required: true,
      },
      commissionForEntity: {
        type: 'number',
        required: false,
      },
      commissionForIndividual: {
        type: 'number',
        required: false,
      },
      bynUsd: {
        type: 'number',
        required: false,
      },
      bynEur: {
        type: 'number',
        required: false,
      },
      usdEur: {
        type: 'number',
        required: false,
      },
      currency: {
        type: 'CurrencyType',
        required: true,
      },
      balance: {
        type: 'number',
        required: false,
      },
    };
  }
}
