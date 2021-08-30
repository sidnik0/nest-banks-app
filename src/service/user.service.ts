import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/interface/user.repository';
import { UserModel } from '../model/interface/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(model: UserModel): Promise<UserModel> {
    return await this.userRepository.create(model);
  }

  async get(id: string): Promise<UserModel> {
    return await this.userRepository.get(id);
  }

  async getAll(): Promise<UserModel[]> {
    return await this.userRepository.getAll();
  }

  async update(model: UserModel): Promise<UserModel> {
    const data = this.userRepository.get(model.id);

    return this.userRepository.update({ ...data, ...model });
  }
}
