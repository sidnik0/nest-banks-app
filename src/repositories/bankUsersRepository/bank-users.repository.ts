import { BankUsersModelFs } from '../../models/bankUsersModel/bank-users.model.fs';

export abstract class BankUsersRepository {
  abstract create(createData: BankUsersModelFs): Promise<BankUsersModelFs>;

  abstract getBanksByIdUser(idUser: string): Promise<Array<BankUsersModelFs>>;

  abstract getUsersByIdBank(idBank: string): Promise<Array<BankUsersModelFs>>;

  abstract get(): Promise<Array<BankUsersModelFs>>;

  abstract deleteById(iBankUsers: string): Promise<void>;
}
