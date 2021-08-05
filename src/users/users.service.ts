import { Injectable } from '@nestjs/common';
import { HelpersService } from '../common/helpers/helpers.service';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  private users: Map<string, UserInterface> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  create(createUserDto: CreateUserDto): UserInterface {
    const id = this.helpersService.createId();

    this.users.set(id, { ...createUserDto, id });

    return this.users.get(id);
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
