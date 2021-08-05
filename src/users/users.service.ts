import { Injectable } from '@nestjs/common';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  private users: Map<string, UserInterface> = new Map();

  create(createUserDto: CreateUserDto): UserInterface {
    this.users.set(createUserDto.id, createUserDto);

    return this.users.get(createUserDto.id);
  }

  getById(id: string): UserInterface | undefined {
    return this.users.get(id);
  }
  get(): Map<string, UserInterface> {
    return this.users;
  }

  updateById(id: string, updateUserDto: UpdateUserDto): UserInterface {
    const oldValue = this.users.get(id);

    this.users.set(id, { ...oldValue, ...updateUserDto });

    return this.users.get(id);
  }

  deleteById(id: string): boolean {
    return this.users.delete(id);
  }
}
