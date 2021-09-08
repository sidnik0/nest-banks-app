import { Injectable } from '@nestjs/common';
import { UserService } from '../../../service/user.service';
import { UserModel } from '../../../model/interface/user.model';
import { Command } from './command';

@Injectable()
export class GetUsersCommand extends Command {
  constructor(private readonly userService: UserService) {
    super();
  }

  async performAdditionally(): Promise<UserModel[]> {
    return await this.userService.getAll();
  }

  getCommandDescription(): string {
    return `Get all users

    Options:
      help                              Display help for command
    `;
  }
}
