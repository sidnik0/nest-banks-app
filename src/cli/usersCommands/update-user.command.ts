import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from '../../users/users.service';
import { HelpersService } from '../../common/helpers/helpers.service';

import { UpdateUserDto } from '../../users/dto/update-user.dto';

@Command({ name: 'update-user', description: 'Update user' })
export class UpdateUserCommand implements CommandRunner {
  private readonly id = 'id';
  private readonly name = 'name';
  private readonly face = 'face';
  private readonly properties = [this.id, this.name, this.face];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: HelpersService,
  ) {}

  async run(args: Array<string>, options: UpdateUserDto): Promise<void> {
    const updateUser = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    const id = updateUser[this.id] || options.id;

    const user = await this.usersService.updateById(id, {
      ...updateUser,
      ...options,
    });

    console.log(user);
  }

  @Option({
    flags: '-i, id=<id>',
    description: 'User id',
  })
  parseId(id: string): string {
    if (!id) {
      console.error('User id not specified');
      process.exit(0);
    }

    return id;
  }

  @Option({
    flags: '-n, name=<name>',
    description: 'User name',
  })
  parseName(name: string): string {
    return name;
  }

  @Option({
    flags: '-f, face=<face>',
    description: 'User face ("entity" || "individual")',
  })
  parseFace(face: string): string {
    if (face !== 'entity') return 'individual';

    return face;
  }
}
