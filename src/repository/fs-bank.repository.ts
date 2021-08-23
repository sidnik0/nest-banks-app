import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IBankRepository } from './interface/bank.repository';
import { FsHelper } from '../common/helper/interface/fs.helper';
import { IdHelper } from '../common/helper/interface/id.helper';
import { BankModel } from '../model/interface/bank.model';

@Injectable()
export class FsBankRepository
  extends FsBaseRepository<BankModel>
  implements IBankRepository
{
  constructor(
    protected readonly fsHelper: FsHelper,
    protected readonly idHelper: IdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsBankRepository');
    this.fileName = 'banks';
    this.data = fsHelper.readFile<BankModel>(this.fileName);
  }
}
