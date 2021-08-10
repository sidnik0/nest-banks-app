import { Command, CommandRunner, Option } from 'nest-commander';
import { RegistrationsService } from '../../registrations/registrations.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { RegistrationBankDto } from '../../registrations/dto/registration-bank.dto';

@Command({ name: 'create-bank', description: 'Create a bank in the app' })
export class RegistrationBankCommand implements CommandRunner {
  private readonly name = 'name';
  private readonly comEnt = 'comEnt';
  private readonly comInd = 'comInd';
  private readonly properties = [this.name, this.comEnt, this.comInd];

  constructor(
    private readonly registrationService: RegistrationsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: RegistrationBankDto): Promise<void> {
    const registrationBankDto = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    if (!options[this.name]) {
      registrationBankDto[this.name] = this.parseName(
        registrationBankDto[this.name],
      );
    }

    if (!options[this.comEnt]) {
      registrationBankDto[this.comEnt] = this.parseComEnt(
        registrationBankDto[this.comEnt],
      );
    }

    if (!options[this.comInd]) {
      registrationBankDto[this.comInd] = this.parseComInd(
        registrationBankDto[this.comInd],
      );
    }

    const bank = await this.registrationService.registrationBank({
      ...registrationBankDto,
      ...options,
    });

    console.log(bank);
  }

  @Option({
    flags: '-n, name=<name>',
    description: 'Bank name',
  })
  parseName(name: string): string {
    if (!name) {
      console.error('Bank name not specified');
      process.exit(0);
    }

    return name;
  }

  @Option({
    flags: '-e, comEnt=<comEnt>',
    description: 'Entity commission',
  })
  parseComEnt(comEnt: string): number {
    if (!comEnt) {
      console.error('Entity commission not specified');
      process.exit(0);
    }

    const com = Number.parseInt(comEnt);

    return com || 0;
  }

  @Option({
    flags: '-i, comInd=<comInd>',
    description: 'Individuals commission',
  })
  parseComInd(comInd: string): number {
    if (!comInd) {
      console.error('Name not specified');
      process.exit(0);
    }

    const com = Number.parseInt(comInd);

    return com || 0;
  }
}
