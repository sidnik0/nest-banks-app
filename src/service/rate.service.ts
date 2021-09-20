import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { IRateService } from './interface/rate.service';
import { IRateRepository } from '../repository/interface/rate.repository';
import { RateModel } from 'src/model/interface/rate.model';

@Injectable()
export class RateService extends BaseService<RateModel> implements IRateService {
  constructor(protected readonly repository: IRateRepository) {
    super(repository);
  }

  async create(): Promise<RateModel> {
    throw Error('Prohibited operation');
  }

  async delete(): Promise<boolean> {
    throw Error('Prohibited operation');
  }
}
