import { IBaseService } from './base.service';
import { UserModel } from '../../model/interface/user.model';
import { BankModel } from '../../model/interface/bank.model';
import { AccountModel } from '../../model/interface/account.model';
import { RateModel } from '../../model/interface/rate.model';

export interface IUserCreationWithAccountCreation {
  user: UserModel;
  bank: BankModel;
  rate: RateModel;
  account: Pick<AccountModel, 'currency' | 'balance'>;
}

export abstract class IUserService extends IBaseService<UserModel> {
  abstract getAllBanks(id: string): Promise<BankModel[]>;
  abstract createUserWithAccountCreation(
    userCreationWithAccountCreation: IUserCreationWithAccountCreation,
  ): Promise<{ user: UserModel; bank: BankModel; account: AccountModel }>;
}
