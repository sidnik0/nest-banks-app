import { Module } from '@nestjs/common';
import { RFsHelper } from './r-fs.helper';
import { FsHelper } from './interface/fs.helper';
import { RIdHelper } from './r-id.helper';
import { IdHelper } from './interface/id.helper';
import { RCliHelper } from './r-cli.helper';
import { CliHelper } from './interface/cli.helper';

@Module({
  providers: [
    {
      provide: FsHelper,
      useClass: RFsHelper,
    },
    {
      provide: IdHelper,
      useClass: RIdHelper,
    },
    {
      provide: CliHelper,
      useClass: RCliHelper,
    },
  ],
  exports: [FsHelper, IdHelper, CliHelper],
})
export class HelperModule {}
