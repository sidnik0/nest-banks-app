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
    super(repository);
  }

  getAllByUser(id: string): Promise<AccountEntity[]> {
    return this.repository.find({ userId: id });
  }

  getAllByBank(id: string): Promise<AccountEntity[]> {
    return this.repository.find({ bankId: id });
  }

  getAllByUserAndBank(
    userId: string,
    bankId: string,
  ): Promise<AccountEntity[]> {
    return this.repository.find({ userId, bankId });
  }
}
