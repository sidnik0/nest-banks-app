import { BaseRepository } from './base.repository';
import { AccountModel } from '../../model/account.model';

export abstract class AccountRepository extends BaseRepository<AccountModel> {
  abstract getAllByUserBank(id: string): Promise<Array<AccountModel>>;
}
