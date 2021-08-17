import { UsersModelFs } from '../../models/usersModel/users.model.fs';

export abstract class UsersRepository {
  abstract create(createData: UsersModelFs): Promise<UsersModelFs>;

  abstract getById(idUser: string): Promise<UsersModelFs>;

  abstract get(): Promise<Array<UsersModelFs>>;

  abstract updateById(
    idUser: string,
    updateData: UsersModelFs,
  ): Promise<UsersModelFs>;

  abstract deleteById(idUser: string): Promise<void>;
}
