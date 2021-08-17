import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { BanksService } from '../banks/banks.service';

import { RegistrationUserInterface } from './interfaces/registration-user.interface';
import { RegistrationBankInterface } from './interfaces/registration-bank.interface';

import { RegistrationUserDto } from './dto/registration-user.dto';
import { RegistrationBankDto } from './dto/registration-bank.dto';

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly banksService: BanksService,
  ) {}

  async registrationUser(
    registrationUserDto: RegistrationUserDto,
  ): Promise<RegistrationUserInterface> {
    return this.usersService.create(registrationUserDto);
  }

  async registrationBank(
    registrationBankDto: RegistrationBankDto,
  ): Promise<RegistrationBankInterface> {
    return this.banksService.create(registrationBankDto);
  }
}
