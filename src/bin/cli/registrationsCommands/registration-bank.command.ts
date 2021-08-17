import { Injectable } from '@nestjs/common';
import { RegistrationsService } from '../../registrations/registrations.service';
import { HelpersService } from '../../../common/helpers/helpers.service';

import { RegistrationBankDto } from '../../registrations/dto/registration-bank.dto';
import { commands } from '../commands';
import { createBankHelp } from '../helps';

@Injectable()
export class RegistrationBankCommand {
  private readonly name = 'name';
  private readonly comEnt = 'comEnt';
  private readonly comInd = 'comInd';
  private readonly properties = [this.name, this.comEnt, this.comInd];

  constructor(
    private readonly registrationService: RegistrationsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(createBankHelp);
      process.exit(0);
    }

    const registrationBankDto = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    try {
      registrationBankDto[this.name] = this.parseName(
        registrationBankDto[this.name],
      );

      registrationBankDto[this.comEnt] = this.parseComEnt(
        registrationBankDto[this.comEnt],
      );

      registrationBankDto[this.comInd] = this.parseComInd(
        registrationBankDto[this.comInd],
      );

      const bank = await this.registrationService.registrationBank(
        registrationBankDto as RegistrationBankDto,
      );

      console.log(bank);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseName(name: string): string {
    if (!name) {
      console.error('Bank name not specified');
      process.exit(0);
    }

    return name;
  }

  parseComEnt(comEnt: string): number {
    if (!comEnt) {
      console.error('Entity commission not specified');
      process.exit(0);
    }

    const com = Number.parseInt(comEnt);

    return com || 0;
  }

  parseComInd(comInd: string): number {
    if (!comInd) {
      console.error('Name not specified');
      process.exit(0);
    }

    const com = Number.parseInt(comInd);

    return com || 0;
  }
}
