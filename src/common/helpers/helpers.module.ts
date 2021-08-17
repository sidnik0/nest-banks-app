import { Module } from '@nestjs/common';
import { HelpersService } from './helpers.service';
import { HelpersServiceFs } from './helpers.service.fs';

@Module({
  providers: [
    {
      provide: HelpersService,
      useClass: HelpersServiceFs,
    },
  ],
  exports: [HelpersService],
})
export class HelpersModule {}
