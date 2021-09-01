import { BaseRepository } from './base.repository';
import { AccountModel } from '../../model/interface/account.model';

export abstract class AccountRepository extends BaseRepository<AccountModel> {
  abstract getAllByUser(id: string): Promise<AccountModel[]>;
  abstract getAllByBank(id: string): Promise<AccountModel[]>;
  abstract getAllByUserAndBank(
    userId: string,
    bankId: string,
  ): Promise<AccountModel[]>;
}