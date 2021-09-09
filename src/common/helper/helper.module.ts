import { Module } from '@nestjs/common';
import { FileSystem } from './file-system';
import { IdGenerator } from './id-generator';
import { PropertyParser } from './property-parser';
import { RequiredPropertyValidator } from './required-property-validator';

@Module({
  providers: [
    FileSystem,
    IdGenerator,
    PropertyParser,
    RequiredPropertyValidator,
  ],
  exports: [
    FileSystem, 
    IdGenerator, 
    PropertyParser, 
    RequiredPropertyValidator
  ],
})
export class HelperModule {}
