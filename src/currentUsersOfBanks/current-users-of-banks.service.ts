import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { HelpersService } from '../common/helpers/helpers.service';

import { CurrentUserOfBankInterface } from './interfaces/current-user-of-bank.interface';

import { CreateCurrentUserOfBankDto } from './dto/create-current-user-of-bank.dto';

@Injectable()
export class CurrentUsersOfBanksService {
  private currentUsersOfBanks: Map<string, CurrentUserOfBankInterface> =
    new Map();

  constructor(
    private readonly helpersService: HelpersService,
    private readonly accountsService: AccountsService,
  ) {}

  async create(
    createCurrentUserOfBankDto: CreateCurrentUserOfBankDto,
  ): Promise<void> {
    const id = this.helpersService.createId();

    this.currentUsersOfBanks.set(id, { ...createCurrentUserOfBankDto, id });
    await this.accountsService.create(createCurrentUserOfBankDto);
  }

  async getBanksByIdUser(idUser: string): Promise<Array<string>> {
    const result = [];

    for (const obj of this.currentUsersOfBanks.values()) {
      if (obj.idUser !== idUser) continue;

      result.push(obj.idBank);
    }

    return result;
  }

  async getUsersByIdBank(idBank: string): Promise<Array<string>> {
    const result = [];

    for (const obj of this.currentUsersOfBanks.values()) {
      if (obj.idBank !== idBank) continue;

      result.push(obj.idUser);
    }

    return result;
  }

  async deleteById(id: string): Promise<boolean> {
    return this.currentUsersOfBanks.delete(id);
  }
}
