import { Command, CommandRunner, Option } from 'nest-commander';
import { RegistrationsService } from '../../registrations/registrations.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { RegistrationUserDto } from '../../registrations/dto/registration-user.dto';

@Command({ name: 'create-user', description: 'Create a user in the app' })
export class RegistrationUserCommand implements CommandRunner {
  private readonly name = 'name';
  private readonly face = 'face';
  private readonly properties = [this.name, this.face];

  constructor(
    private readonly registrationService: RegistrationsService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: RegistrationUserDto): Promise<void> {
    const registrationUserDto = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    if (!options[this.name]) {
      registrationUserDto[this.name] = this.parseName(
        registrationUserDto[this.name],
      );
    }

    if (!options[this.face]) {
      registrationUserDto[this.face] = this.parseFace(
        registrationUserDto[this.face],
      );
    }

    const user = await this.registrationService.registrationUser({
      ...registrationUserDto,
      ...options,
    });

    console.log(user);
  }

  @Option({
    flags: '-n, name=<name>',
    description: 'User name',
  })
  parseName(name: string): string {
    if (!name) {
      console.error('User name not specified');
      process.exit(0);
    }

    return name;
  }

  @Option({
    flags: '-f, face=<face>',
    description: 'User face ("entity" || "individual")',
  })
  parseFace(face: string): string {
    if (!face) {
      console.error('User face not specified');
      process.exit(0);
    }

    if (face !== 'entity') return 'individual';

    return face;
  }
}
