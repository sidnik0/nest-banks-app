import { Module } from '@nestjs/common';
import { CommandModule } from '../command/command.module';
import { ConsoleInterpreter } from './console-interpreter';
import { ConsoleCommandResultViewer } from './console-command-result-viewer';
import { ConsoleLineParser } from './console-line-parser';

@Module({
  imports: [CommandModule],
  providers: [ConsoleInterpreter, ConsoleCommandResultViewer, ConsoleLineParser],
  exports: [ConsoleInterpreter],
})
export class CliModule {}
