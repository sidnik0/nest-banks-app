import { Module } from '@nestjs/common';
import { RegistrationUserCommand } from './registration-user.command';
import { RegistrationBankCommand } from './registration-bank.command';

import { RegistrationsModule } from '../../registrations/registrations.module';
import { HelpersModule } from '../../../common/helpers/helpers.module';

@Module({
  imports: [RegistrationsModule, HelpersModule],
  providers: [RegistrationUserCommand, RegistrationBankCommand],
  exports: [RegistrationUserCommand, RegistrationBankCommand],
})
export class RegistrationsCommandsModule {}
