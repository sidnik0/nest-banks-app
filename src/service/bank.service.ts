import { Injectable } from '@nestjs/common';
import { BaseService } from './base.service';
import { BankRepository } from '../repository/interface/bank.repository';
import { BankModel } from '../model/interface/bank.model';

@Injectable()
export class BankService extends BaseService<BankModel> {
  constructor(protected readonly repository: BankRepository) {
    super(repository);
  }
}
