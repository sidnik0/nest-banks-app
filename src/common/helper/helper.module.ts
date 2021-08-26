import { Module } from '@nestjs/common';
import { FsHelper } from './fs-helper';
import { IFsHelper } from './interface/fs-helper';
import { IdHelper } from './id-helper';
import { IIdHelper } from './interface/id-helper';

@Module({
  providers: [
    {
      provide: IFsHelper,
      useClass: FsHelper,
    },
    {
      provide: IIdHelper,
      useClass: IdHelper,
    },
  ],
  exports: [IFsHelper, IIdHelper],
})
export class HelperModule {}
