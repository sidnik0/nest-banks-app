import { Module } from '@nestjs/common';

import { ServiceModule } from '../../service/service.module';
import { HelperModule } from '../../common/helper/helper.module';

import { ConsoleInterpreter } from './console-interpreter';
import { CommandExecutor } from './command-executor';
import { CommandLineParser } from './command-line-parser';
import { CommandFactory } from './command-factory';
import { ConsoleCommandResultViewer } from './console-command-result-viewer';

import { commands } from './commands';

@Module({
  imports: [ServiceModule, HelperModule],
  providers: [
    ConsoleInterpreter,
    CommandExecutor,
    CommandLineParser,
    CommandFactory,
    ConsoleCommandResultViewer,
    ...commands,
  ],
  exports: [ConsoleInterpreter, CommandExecutor],
})
export class CliModule {}
