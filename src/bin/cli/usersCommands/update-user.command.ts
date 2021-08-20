import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { RIdHelper } from '../../../common/helper/r-id.helper';

import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { commands } from '../commands';
import { updateUserHelp } from '../helps';

@Injectable()
export class UpdateUserCommand {
  private readonly id = 'id';
  private readonly name = 'name';
  private readonly face = 'face';
  private readonly properties = [this.id, this.name, this.face];

  constructor(
    private readonly usersService: UsersService,
    private readonly helpersService: RIdHelper,
  ) {}

  async run(args: Array<string>): Promise<void> {
    if (args[0] === commands.help || !args[0]) {
      console.log(updateUserHelp);
      process.exit(0);
    }

    const updateUser = this.helpersService.convertingArgs(
      args,
      this.properties,
    );

    try {
      updateUser[this.id] = this.parseId(updateUser[this.id]);

      updateUser[this.name] = this.parseName(updateUser[this.name]);

      updateUser[this.face] = this.parseFace(updateUser[this.face]);

      const id = updateUser[this.id];

      const user = await this.usersService.updateById(
        id,
        updateUser as UpdateUserDto,
      );

      console.log(user);
    } catch (e) {
      console.log(e.message);
      console.error('Internal error');
      process.exit(0);
    }
  }

  parseId(id: string): string {
    if (!id) {
      console.error('User id not specified');
      process.exit(0);
    }

    return id;
  }

  parseName(name: string): string {
    return name;
  }

  parseFace(face: string): string {
    if (face !== 'entity') return 'individual';

    return face;
  }
}
