import { IBaseService } from './base.service';
import { RateModel } from '../../model/interface/rate.model';

export abstract class IRateService extends IBaseService<RateModel> {
  abstract getByBank(id: string): Promise<RateModel>;
}
