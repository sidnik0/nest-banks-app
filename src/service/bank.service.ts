import { Injectable } from '@nestjs/common';
import { IBankRepository } from '../repository/interface/bank.repository';
import { BankModel } from '../model/interface/bank.model';

@Injectable()
export class BankService {
  constructor(private readonly bankRepository: IBankRepository) {}

  async create(model: BankModel): Promise<BankModel> {
    return await this.bankRepository.create(model);
  }

  async get(id: string): Promise<BankModel> {
    return await this.bankRepository.get(id);
  }

  async getAll(): Promise<BankModel[]> {
    return await this.bankRepository.getAll();
  }

  async update(model: BankModel): Promise<BankModel> {
    const data = await this.bankRepository.get(model.id);

    return await this.bankRepository.update({ ...data, ...model });
  }

  async delete(id: string): Promise<boolean> {
    return await this.bankRepository.delete(id);
  }
}
