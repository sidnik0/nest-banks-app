import { Injectable } from '@nestjs/common';
import { Command } from './command';
import { IUserService } from '../../../service/interface/user.service';
import { UserModel } from '../../../model/interface/user.model';

@Injectable()
export class GetUsersCommand extends Command {
  constructor(private readonly userService: IUserService) {
    super();
  }

  async executeMainLogic(): Promise<UserModel[]> {
    return await this.userService.getAll();
  }

  getCommandDescription(): string {
    return `Get all users

    Options:
      help                              Display help for command
    `;
  }
}
