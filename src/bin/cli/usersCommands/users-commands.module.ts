import { Module } from '@nestjs/common';
import { UpdateUserCommand } from './update-user.command';
import { DeleteUserCommand } from './delete-user.command';
import { GetUserCommand } from './get-user.command';
import { GetUsersCommand } from './get-users.command';

import { HelperModule } from '../../../common/helper/helper.module';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [HelperModule, UsersModule],
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
