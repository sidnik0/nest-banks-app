import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { createUserHelp } from './helps-string';

@Injectable()
export class CreateUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.requiredProperties = {
      name: 'string',
      face: 'FaceType',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: createUserHelp };

    const model = this.validateAndParseProperties<UserModel>(params);

    const result = await this.userService.create(model);

    return { result };
  }
}
