import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { deleteUserHelp } from './helps-string';

@Injectable()
export class DeleteUserCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();

    this.requiredProperties = {
      id: 'string',
    };
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: deleteUserHelp };

    const model = this.validateAndParseProperties<UserModel>(params);

    await this.userService.delete(model.id);

    return { result: `User with id=${model.id} deleted` };
  }
}
