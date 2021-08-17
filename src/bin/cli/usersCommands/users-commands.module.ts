import { Module } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
import { DeleteUserCommand } from './delete-user.command';
import { GetUserCommand } from './get-user.command';
import { GetUsersCommand } from './get-users.command';

import { HelpersModule } from '../../../common/helpers/helpers.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [HelpersModule, UsersModule],
  providers: [
    UpdateUserCommand,
    DeleteUserCommand,
    GetUserCommand,
    GetUsersCommand,
  ],
  exports: [
    UpdateUserCommand,
    DeleteUserCommand,
    GetUserCommand,
    GetUsersCommand,
  ],
})
export class UsersCommandsModule {}
