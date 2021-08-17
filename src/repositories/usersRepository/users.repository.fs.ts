import { Injectable } from '@nestjs/common';
import { HelpersService } from '../../common/helpers/helpers.service';
import { UsersRepository } from './users.repository';
import { UsersModelFs } from '../../models/usersModel/users.model.fs';

@Injectable()
export class UsersRepositoryFs implements UsersRepository {
  private users: Map<string, UsersModelFs> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(data: UsersModelFs): Promise<UsersModelFs> {
    const id = this.helpersService.createId();

    this.users.set(id, { ...data, id });

    return this.users.get(id);
  }

  async getById(id: string): Promise<UsersModelFs> {
    return this.users.get(id);
  }

  async get(): Promise<Array<UsersModelFs>> {
    const result = [];

    for (const obj of this.users.values()) {
      result.push(obj);
    }
    return result;
  }

  async updateById(id: string, newData: UsersModelFs): Promise<UsersModelFs> {
    const oldData = this.users.get(id);

    if (!oldData) return null;

    this.users.set(id, { ...oldData, ...newData });

    return this.users.get(id);
  }

  async deleteById(id: string): Promise<void> {
    this.users.delete(id);
  }
}
