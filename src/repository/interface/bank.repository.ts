import { IBaseRepository } from './base.repository';
import { BankModel } from '../../model/interface/bank.model';

export abstract class IBankRepository extends IBaseRepository<BankModel> {
  abstract findBankByName(name: string): Promise<BankModel | undefined>;
}
