import { Module } from '@nestjs/common';
import { DeleteUserCommand } from './delete-user.command';
import { GetUserCommand } from './get-user.command';
import { GetUsersCommand } from './get-users.command';
import { UpdateUserCommand } from './update-user.command';

import { HelpersModule } from '../../common/helpers/helpers.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [HelpersModule, UsersModule],
  providers: [
    GetUserCommand,
    GetUsersCommand,
    UpdateUserCommand,
    DeleteUserCommand,
  ],
})
export class UsersCommandsModule {}
