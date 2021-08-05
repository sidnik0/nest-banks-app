import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { AccountInterface } from './interfaces/acoount.interface';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  private readonly accounts: Map<string, AccountInterface> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  create(createAccountDto: CreateAccountDto): AccountInterface {
    const id = this.helpersService.createId();

    const balance = createAccountDto.balance || 0;

    this.accounts.set(id, { ...createAccountDto, balance, id });

    return this.accounts.get(id);
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
