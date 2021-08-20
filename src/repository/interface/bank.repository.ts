import { BaseRepository } from './base.repository';
import { BankModel } from '../../model/interface/bank.model';

export abstract class BankRepository extends BaseRepository<BankModel> {}
