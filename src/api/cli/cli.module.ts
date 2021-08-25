import { Module } from '@nestjs/common';
import { ConsoleInterpreter } from './console-interpreter';
import { ConsoleExecutor } from './console-executor';
import { CommandDescriptor } from './command-descriptor';

@Module({
  providers: [ConsoleInterpreter, ConsoleExecutor, CommandDescriptor],
  exports: [ConsoleInterpreter],
})
export class CliModule {}
