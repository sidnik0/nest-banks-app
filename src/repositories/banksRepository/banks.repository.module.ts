import { Module } from '@nestjs/common';
import { HelpersModule } from '../../common/helpers/helpers.module';
import { BanksRepository } from './banks.repository';
import { BanksRepositoryFs } from './banks.repository.fs';

@Module({
  imports: [HelpersModule],
  providers: [
    {
      provide: BanksRepository,
      useClass: BanksRepositoryFs,
    },
  ],
  exports: [BanksRepository],
})
export class BanksRepositoryModule {}
