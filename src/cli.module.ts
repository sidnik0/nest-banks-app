import { Module } from '@nestjs/common';
import { RegistrationsCommandsModule } from './cli/registrationsCommands/registrations-commands.module';
import { UsersCommandsModule } from './cli/usersCommands/users-commands.module';
import { BanksCommandsModule } from './cli/banksCommands/banks-commands.module';

@Module({
  imports: [
    RegistrationsCommandsModule,
    UsersCommandsModule,
    BanksCommandsModule,
  ],
})
export class CliModule {}
