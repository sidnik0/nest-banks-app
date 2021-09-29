import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IRateService } from './interface/rate.service';
import { IRateRepository } from '../repository/interface/rate.repository';
import { RateModel } from '../model/interface/rate.model';

@Injectable()
export class RateService extends BaseService<RateModel> implements IRateService {
  constructor(protected readonly repository: IRateRepository) {
    super(repository);
  }

  create(): never {
    throw Error('Prohibited operation');
  }

  get(): never {
    throw Error('Prohibited operation');
  }

  delete(): never {
    throw Error('Prohibited operation');
  }

  async getByBank(id: string): Promise<RateModel> {
    return await this.repository.getByBank(id);
  }
}
