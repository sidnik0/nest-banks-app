import { Injectable } from '@nestjs/common';
import { AccountInterface } from './interfaces/acoount.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private readonly accounts: Map<string, AccountInterface> = new Map();

  create(createAccountDto: CreateAccountDto): AccountInterface {
    const balance = createAccountDto.balance || 0;
    this.accounts.set(createAccountDto.id, { ...createAccountDto, balance });

    return this.accounts.get(createAccountDto.id);
  }

  getById(id: string): AccountInterface | undefined {
    return this.accounts.get(id);
  }

  get(): Map<string, AccountInterface> {
    return this.accounts;
  }

  update(id: string, updateAccountDto: UpdateAccountDto): AccountInterface {
    const oldValue = this.accounts.get(id);

    this.accounts.set(id, { ...oldValue, ...updateAccountDto });

    return this.accounts.get(id);
  }

  delete(id: string): boolean {
    return this.accounts.delete(id);
  }
}
