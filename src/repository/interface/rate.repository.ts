import { IBaseRepository } from './base.repository';
import { RateModel } from '../../model/interface/rate.model';

export abstract class IRateRepository extends IBaseRepository<RateModel> {}
