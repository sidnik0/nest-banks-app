import { Injectable } from '@nestjs/common';
import { BanksRepository } from './banks.repository';
import { HelpersService } from '../../common/helpers/helpers.service';
import { BanksModelFs } from '../../models/banksModel/banks.model.fs';

@Injectable()
export class BanksRepositoryFs implements BanksRepository {
  private banks: Map<string, BanksModelFs> = new Map();

  constructor(private readonly helpersService: HelpersService) {}

  async create(data: BanksModelFs): Promise<BanksModelFs> {
    const id = this.helpersService.createId();

    this.banks.set(id, { ...data, id });

    return this.banks.get(id);
  }

  async getById(id: string): Promise<BanksModelFs> {
    return this.banks.get(id);
  }

  async get(): Promise<Array<BanksModelFs>> {
    const result: Array<BanksModelFs> = [];

    for (const obj of this.banks.values()) {
      result.push(obj);
    }
    return result;
  }

  async updateById(id: string, newData: BanksModelFs): Promise<BanksModelFs> {
    const oldData = this.banks.get(id);

    if (!oldData) return null;

    this.banks.set(id, { ...oldData, ...newData });

    return this.banks.get(id);
  }

  async deleteById(id: string): Promise<void> {
    this.banks.delete(id);
  }
}
