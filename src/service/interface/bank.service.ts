import { IBaseService } from './base.service';
import { BankModel } from '../../model/interface/bank.model';
import { UserModel } from '../../model/interface/user.model';

export abstract class IBankService extends IBaseService<BankModel> {
  abstract getAllUsers(id: string): Promise<UserModel[]>;
}
