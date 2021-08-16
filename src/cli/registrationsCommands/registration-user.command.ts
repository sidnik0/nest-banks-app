import { Injectable } from '@nestjs/common';
import { RegistrationsService } from '../../registrations/registrations.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { RegistrationUserDto } from '../../registrations/dto/registration-user.dto';
import { commands } from '../commands';
import { createUserHelp } from '../helps';

@Injectable()
export class RegistrationUserCommand {
  private readonly name = 'name';
  private readonly face = 'face';
  private readonly properties = [this.name, this.face];

  constructor(
    private readonly registrationService: RegistrationsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(createUserHelp);
      process.exit(0);
    }

    const registrationUserDto = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    registrationUserDto[this.name] = this.parseName(
      registrationUserDto[this.name],
    );

    registrationUserDto[this.face] = this.parseFace(
      registrationUserDto[this.face],
    );

    const user = await this.registrationService.registrationUser(
      registrationUserDto as RegistrationUserDto,
    );

    console.log(user);
  }

  parseName(name: string): string {
    if (!name) {
      console.error('User name not specified');
      process.exit(0);
    }

    return name;
  }

  parseFace(face: string): string {
    if (!face) {
      console.error('User face not specified');
      process.exit(0);
    }

    if (face !== 'entity') return 'individual';

    return face;
  }
}
