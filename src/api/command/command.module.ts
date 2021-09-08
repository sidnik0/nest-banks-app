import { Module } from '@nestjs/common';

import { ServiceModule } from '../../service/service.module';
import { HelperModule } from '../../common/helper/helper.module';

import { ConsoleInterpreter } from '../cli/console-interpreter';
import { CommandExecutor } from './command-executor';
import { CommandFactory } from './command-factory';
import { commands } from './commands';

@Module({
  imports: [ServiceModule, HelperModule],
  providers: [CommandExecutor, CommandFactory, ...commands],
  exports: [CommandExecutor],
})
export class CommandModule {}
