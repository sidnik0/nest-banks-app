import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { AccountInterface } from './interfaces/account.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private readonly accounts: Map<string, AccountInterface> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(createAccountDto: CreateAccountDto): Promise<AccountInterface> {
    const id = this.helpersService.createId();

    const balance = createAccountDto.balance || 0;

    this.accounts.set(id, { ...createAccountDto, balance, id });

    return this.accounts.get(id);
  }

  async getById(id: string): Promise<AccountInterface> {
    return this.accounts.get(id);
  }

  async getAllByIdUser(idUser: string): Promise<Array<AccountInterface>> {
    const result = [];

    for (const obj of this.accounts.values()) {
      if (obj.idUser !== idUser) continue;

      result.push(obj);
    }

    return result;
  }

  async get(): Promise<Map<string, AccountInterface>> {
    return this.accounts;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<void> {
    const oldValue = this.accounts.get(id);

    this.accounts.set(id, { ...oldValue, ...updateAccountDto });
  }

  async delete(id: string): Promise<boolean> {
    return this.accounts.delete(id);
  }
}
