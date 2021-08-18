import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { FsHelperService } from './fs-helper.service';

@Module({
  providers: [FsHelperService],
  exports: [HelperService],
})
export class HelperModule {}
