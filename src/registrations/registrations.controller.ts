import { Controller, Post, Body } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
import { RegistrationUserInterface } from './interfaces/registration-user.interface';
import { RegistrationBankInterface } from './interfaces/registration-bank.interface';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { RegistrationBankDto } from './dto/registration-bank.dto';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('user')
  async registrationUser(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<RegistrationUserInterface> {
    console.log(`Create user`);

    return this.registrationsService.registrationUser(registrationUserDto);
  }

  @Post('bank')
  async registrationBank(
    @Body() registrationBankDto: RegistrationBankDto,
  ): Promise<RegistrationBankInterface> {
    console.log('Create bank');

    return this.registrationsService.registrationBank(registrationBankDto);
  }
}
