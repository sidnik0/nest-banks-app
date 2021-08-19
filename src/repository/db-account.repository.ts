import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { AccountRepository } from './interface/account.repository';
import { AccountEntity } from '../model/account.entity';

@Injectable()
export class DbAccountRepository
  extends DbBaseRepository<AccountEntity>
  implements AccountRepository
{
  constructor(
    @InjectRepository(AccountEntity)
    protected readonly repository: Repository<AccountEntity>,
  ) {
    super();
  }

  getAllByUserBank(id: string): Promise<Array<AccountEntity>> {
    if (!id) return null;

    return this.repository.find({ userBankId: id });
  }
}
