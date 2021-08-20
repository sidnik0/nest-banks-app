import { Injectable } from '@nestjs/common';
import { RIdHelper } from '../../common/helper/r-id.helper';

import { UserInterface } from './interfaces/user.interface';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: Map<string, UserInterface> = new Map();

  constructor(private readonly helpersService: RIdHelper) {}

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const id = this.helpersService.createId();

    this.users.set(id, { ...createUserDto, id });

    return this.users.get(id);
  }

  async getById(id: string): Promise<UserInterface> {
    return this.users.get(id);
  }

  async updateById(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    const oldValue = this.users.get(id);

    this.users.set(id, { ...oldValue, ...updateUserDto });

    return this.users.get(id);
  }

  async deleteById(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async get(): Promise<Map<string, UserInterface>> {
    return this.users;
  }
}
