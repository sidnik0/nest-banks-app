import { Controller, Post, Body } from '@nestjs/common';
import { RegistrationsService } from './registrations.service';
// import { RegistrationUserInterface } from './interface/registration-user.interface';
// import { RegistrationBankInterface } from './interface/registration-bank.interface';
import { RegistrationUserDto } from './dto/registration-user.dto';
import { RegistrationBankDto } from './dto/registration-bank.dto';

@Controller('registrations')
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('user')
  async registrationUser(
    @Body() registrationUserDto: RegistrationUserDto,
  ): Promise<void> {
    console.log(`Create user`);

    await this.registrationsService.registrationUser(registrationUserDto);
  }

  @Post('bank')
  async registrationBank(
    @Body() registrationBankDto: RegistrationBankDto,
  ): Promise<void> {
    console.log('Create bank');

    await this.registrationsService.registrationBank(registrationBankDto);
  }
}
