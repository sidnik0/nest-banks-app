import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { UserBankRepository } from './interface/user-bank.repository';
import { UserBankEntity } from '../model/user-bank.entity';
import { UserBankModel } from '../model/user-bank.model';

@Injectable()
export class DbUserBankRepository
  extends DbBaseRepository<UserBankEntity>
  implements UserBankRepository
{
  constructor(
    @InjectRepository(UserBankEntity)
    protected readonly repository: Repository<UserBankEntity>,
  ) {
    super();
  }

  async update(): Promise<never> {
    throw Error('Prohibited operation');
  }

  async getBanksByUser(id: string): Promise<Array<UserBankModel>> {
    return await this.repository.find({ userId: id });
  }

  async getUsersByBank(id: string): Promise<Array<UserBankModel>> {
    return await this.repository.find({ bankId: id });
  }
}
