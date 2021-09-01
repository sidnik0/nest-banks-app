import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { updateUserHelp } from './helps-string';

@Injectable()
export class UpdateUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.requiredProperties = {
      id: 'string',
      name: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: updateUserHelp };

    const model = this.validateAndParseProperties<UserModel>(params);

    const result = await this.userService.update(model);

    return { result };
  }
}
