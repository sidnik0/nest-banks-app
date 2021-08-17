import { Injectable } from '@nestjs/common';
import { HelpersService } from '../../common/helpers/helpers.service';

import { AccountInterface } from './interfaces/account.interface';

import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private accounts: Map<string, AccountInterface> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(createAccountDto: CreateAccountDto): Promise<AccountInterface> {
    const id = this.helpersService.createId();

    const balance = createAccountDto.balance || 0;

    this.accounts.set(id, { ...createAccountDto, balance, id });

    return this.accounts.get(id);
  }

  async getById(id: string): Promise<AccountInterface> {
    return this.accounts.get(id) || null;
  }

  async getAllByIdBankAndIdUser(
    idBank: string,
    idUser: string,
  ): Promise<Array<AccountInterface>> {
    const result = [];

    for (const obj of this.accounts.values()) {
      if (obj.idUser === idUser && obj.idBank === idBank) {
        result.push(obj);
      }
    }

    return result;
  }

  async getAllByIdUser(idUser: string): Promise<Array<AccountInterface>> {
    const result = [];

    for (const obj of this.accounts.values()) {
      if (obj.idUser === idUser) {
        result.push(obj);
      }
    }

    return result;
  }

  async get(): Promise<Map<string, AccountInterface>> {
    return this.accounts;
  }

  async updateById(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<AccountInterface> {
    const oldValue = this.accounts.get(id);

    this.accounts.set(id, { ...oldValue, ...updateAccountDto });

    return this.accounts.get(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.accounts.delete(id);
  }
}
