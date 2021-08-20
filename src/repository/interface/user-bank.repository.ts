import { BaseRepository } from './base.repository';
import { UserBankModel } from '../../model/interface/user-bank.model';

export abstract class UserBankRepository extends BaseRepository<UserBankModel> {
  abstract getBanksByUser(id: string): Promise<Array<UserBankModel>>;
  abstract getUsersByBank(id: string): Promise<Array<UserBankModel>>;
}
