import { Injectable, Logger } from '@nestjs/common';
import { FsBaseRepository } from './fs-base.repository';
import { IBankRepository } from './interface/bank.repository';
import { IFsHelper } from '../common/helper/interface/fs.helper';
import { IIdHelper } from '../common/helper/interface/id.helper';
import { BankModel } from '../model/interface/bank.model';

@Injectable()
export class FsBankRepository
  extends FsBaseRepository<BankModel>
  implements IBankRepository
{
  constructor(
    protected readonly fsHelper: IFsHelper,
    protected readonly idHelper: IIdHelper,
  ) {
    super(fsHelper, idHelper);

    this.logger = new Logger('FsBankRepository');
    this.fileName = 'banks';
    this.data = fsHelper.readFile<BankModel>(this.fileName);
  }

  getLoggingModelId(model: string | BankModel): string {
    if (typeof model === 'string') return model;

    return model.id ? `id=${model.id}` : `name=${model.name}`;
  }
}
