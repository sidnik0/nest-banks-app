import { Module } from '@nestjs/common';

import { ServiceModule } from '../../service/service.module';
import { HelperModule } from '../../common/helper/helper.module';

import { ConsoleInterpreter } from '../cli/console-interpreter';
import { CommandExecutor } from './command-executor';
import { CommandLineParser } from './command-line-parser';
import { CommandFactory } from './command-factory';
import { commands } from './commands';

@Module({
  imports: [ServiceModule, HelperModule],
  providers: [CommandExecutor, CommandLineParser, CommandFactory, ...commands],
  exports: [CommandExecutor, CommandLineParser, CommandFactory],
})
export class CommandModule {}