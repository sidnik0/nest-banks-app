import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { Command } from './command';
import { CommandDescriptor } from '../interface/command-descriptor';
import { CommandResult } from '../interface/command-result';
import { getUsersHelp } from './helps-string';

@Injectable()
export class GetUsersCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();
  }
  async execute({ params }: CommandDescriptor): Promise<CommandResult> {
    const flags = this.getOptionalFlags(params);

    if (flags.includes('help')) return { result: getUsersHelp };

    const result = await this.userService.getAll();

    return { result };
  }
}
