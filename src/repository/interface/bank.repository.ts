import { BaseRepository } from './base.repository';
import { BankModel } from '../../model/bank.model';

export abstract class BankRepository extends BaseRepository<BankModel> {}
