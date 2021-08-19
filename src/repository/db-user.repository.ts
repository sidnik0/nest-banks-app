import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DbBaseRepository } from './db-base.repository';
import { UserRepository } from './interface/user.repository';
import { UserEntity } from '../model/user.entity';

@Injectable()
export class DbUserRepository
  extends DbBaseRepository<UserEntity>
  implements UserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repository: Repository<UserEntity>,
  ) {
    super();
  }
}
