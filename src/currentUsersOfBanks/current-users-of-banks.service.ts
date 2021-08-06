import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { CurrentUserOfBankInterface } from './interfaces/current-user-of-bank.interface';
import { CreateCurrentUserOfBankDto } from './dto/create-current-user-of-bank.dto';

@Injectable()
export class CurrentUsersOfBanksService {
  private currentUsersOfBanks: Map<string, CurrentUserOfBankInterface> =
    new Map();

  constructor(private readonly helpersService: HelpersService) {}

  create(
    createCurrentUserOfBankDto: CreateCurrentUserOfBankDto,
  ): CurrentUserOfBankInterface {
    const id = this.helpersService.createId();

    this.currentUsersOfBanks.set(id, { ...createCurrentUserOfBankDto, id });

    return this.currentUsersOfBanks.get(id);
  }

  getById(id: string): CurrentUserOfBankInterface | undefined {
    return this.currentUsersOfBanks.get(id);
  }

  deleteById(id: string): boolean {
    return this.currentUsersOfBanks.delete(id);
  }
}
