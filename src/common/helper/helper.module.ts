import { Module } from '@nestjs/common';
import { FileSystemHelper } from './file-system';
import { IdGenerator } from './id-generator';
import { PropertyParser } from './property-parser';
import { RequiredPropertyValidator } from './required-property-validator';

@Module({
  providers: [FileSystemHelper, IdGenerator, PropertyParser, RequiredPropertyValidator],
  exports: [FileSystemHelper, IdGenerator, PropertyParser, RequiredPropertyValidator],
})
export class HelperModule {}
