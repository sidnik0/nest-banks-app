import { IBaseService } from './base.service';
import { UserModel } from '../../model/interface/user.model';
import { BankModel } from '../../model/interface/bank.model';

export abstract class IUserService extends IBaseService<UserModel> {
  abstract getAllBanks(id: string): Promise<BankModel[]>;
}