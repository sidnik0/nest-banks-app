import { IBaseService } from './base.service';
import { AccountModel } from '../../model/interface/account.model';
import { UpdateAccountDto } from '../../api/rest-dto/update-account.dto';

export abstract class IAccountService extends IBaseService<AccountModel> {
  abstract updateBalance(
    id: string,
    obj: Omit<UpdateAccountDto, 'id'>,
  ): Promise<AccountModel>;
  abstract getAllByUser(id: string): Promise<AccountModel[]>;
  abstract getAllByBank(id: string): Promise<AccountModel[]>;
  abstract getAllByUserAndBank(
    userId: string,
    bankId: string,
  ): Promise<AccountModel[]>;
}
