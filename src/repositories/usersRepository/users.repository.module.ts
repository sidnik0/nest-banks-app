import { Module } from '@nestjs/common';
import { HelpersModule } from '../../common/helpers/helpers.module';
import { UsersRepository } from './users.repository';
import { UsersRepositoryFs } from './users.repository.fs';

@Module({
  imports: [HelpersModule],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersRepositoryFs,
    },
  ],
  exports: [UsersRepository],
})
export class AccountRepositoryModule {}
