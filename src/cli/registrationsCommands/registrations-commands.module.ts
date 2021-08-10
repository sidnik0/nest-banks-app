import { Module } from '@nestjs/common';
import { RegistrationBankCommand } from './registration-bank.command';
import { RegistrationUserCommand } from './registration-user.command';

import { RegistrationsModule } from '../../registrations/registrations.module';
import { HelpersModule } from '../../common/helpers/helpers.module';

@Module({
  imports: [RegistrationsModule, HelpersModule],
  providers: [RegistrationBankCommand, RegistrationUserCommand],
})
export class RegistrationsCommandsModule {}
