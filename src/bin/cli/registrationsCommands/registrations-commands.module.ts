import { Module } from '@nestjs/common';
import { RegistrationUserCommand } from './registration-user.command';
import { RegistrationBankCommand } from './registration-bank.command';

import { RegistrationsModule } from '../../registrations/registrations.module';
import { HelperModule } from '../../../common/helper/helper.module';

@Module({
  imports: [RegistrationsModule, HelperModule],
  providers: [RegistrationUserCommand, RegistrationBankCommand],
  exports: [RegistrationUserCommand, RegistrationBankCommand],
})
export class RegistrationsCommandsModule {}
