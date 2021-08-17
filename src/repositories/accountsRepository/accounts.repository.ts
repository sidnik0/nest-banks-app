import { AccountsModelFs } from '../../models/accountsModel/accounts.model.fs';

export abstract class AccountsRepository {
  abstract create(createData: AccountsModelFs): Promise<AccountsModelFs>;
  abstract getById(idAccount: string): Promise<AccountsModelFs>;
  abstract getAllByIdBankAndIdUser(
    idBank: string,
    idUser: string,
  ): Promise<Array<AccountsModelFs>>;
  abstract getAllByIdUser(idUser: string): Promise<Array<AccountsModelFs>>;
  abstract get(): Promise<Array<AccountsModelFs>>;
  abstract updateById(
    idAccount: string,
    updateData: AccountsModelFs,
  ): Promise<AccountsModelFs>;
  abstract deleteById(idAccount: string): void;
}
