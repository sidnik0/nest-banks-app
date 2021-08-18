import { Injectable } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { BankRepository } from './interface/bank.repository';
import { FsHelperService } from '../common/helper/fs-helper.service';
import { BankModel } from '../model/bank.model';

@Injectable()
export class FsBankRepository
  extends FsBaseRepository<BankModel>
  implements BankRepository
{
  constructor(protected readonly fsHelperService: FsHelperService) {
    super(fsHelperService);

    this.fileName = 'banks';
    this.data = fsHelperService.readFile<BankModel>(this.fileName);
  }
}
